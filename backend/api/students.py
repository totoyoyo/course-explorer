from fastapi import APIRouter

from schemas.student import Student, StudentList, StudentDetailsRequest, StudentDetailsResponse

router = APIRouter(
    prefix="/students",
    tags=["students"],
)


@router.get("/{id}", response_model=Student)
async def get_student(id: str):
    return {"id": id}


@router.get("/", response_model=StudentList)
async def get_all_students():
    return {"ids": []}


@router.post("/details", response_model=StudentDetailsResponse)
async def get_student_details(req: StudentDetailsRequest):
    return {"2021-11-13T22:17:28.123Z": []}
