from fastapi import APIRouter

import datetime
from schemas.query import QueryRequest, QueryResponse
from data.loader import get_students, get_clock
from dsl.visitor import run_query
from dsl.extract_attrib import extract_attributes

router = APIRouter(
    prefix="/query",
    tags=["query"],
)


@router.post("/", response_model=QueryResponse)
async def query(body: QueryRequest):
    print(body)
    start = datetime.datetime.strptime(body.start, "%Y-%m-%dT%H:%M:%S%z").timestamp() * 1000
    end = datetime.datetime.strptime(body.end, "%Y-%m-%dT%H:%M:%S%z").timestamp() * 1000
    step = body.step  # step is passed in ms

    students = get_students()
    clock = get_clock()
    clock.time = start

    results = {}

    while clock.time <= end:
        results[datetime.datetime.utcfromtimestamp(clock.time / 1000).strftime("%Y-%m-%dT%H:%M:%S%z")] = [s.anon_id for s in run_query(body.query, students)]
        clock.time += step

    return {"results": results, "attributes": extract_attributes(body.query)}
