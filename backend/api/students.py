import datetime
from fastapi import APIRouter
from data.loader import get_students, get_clock
from data.model.attribute.factory import make_attribute

from schemas.student import Student, StudentList, StudentDetailsRequest, StudentDetailsResponse

router = APIRouter(
    prefix="/students",
    tags=["students"],
)


@router.get("/{id}", response_model=Student)
async def get_student(id: str):
    students = get_students()
    return next((s for s in students if s.anon_id == id), None)  # fixme what should we actually return here?


@router.get("/", response_model=StudentList)
async def get_all_students():
    return {"ids": [s.anon_id for s in get_students()]}


@router.post("/details", response_model=StudentDetailsResponse)
async def get_student_details(req: StudentDetailsRequest):
    start = datetime.datetime.strptime(req.start, "%Y-%m-%dT%H:%M:%S%z").timestamp()
    end = datetime.datetime.strptime(req.start, "%Y-%m-%dT%H:%M:%S%z").timestamp()
    step = req.step / 1000  # step is passed in ms

    students = [s for s in get_students() if (s.anon_id in req.ids)]
    clock = get_clock()
    clock.time = start

    results = {}

    while clock.time <= end:
        students_at_time = []
        for s in students:
            attrib_map = {}
            for attrib in req.attributes:
                attrib_map[attrib] = make_attribute(attrib).get_value_for(s)
            students_at_time.append({"id": s.anon_id, "attributes": attrib_map})
        results[datetime.datetime.utcfromtimestamp(clock.time).strftime("%Y-%m-%dT%H:%M:%S%z")] = students_at_time;
        clock.time += step

    return results
