from fastapi import APIRouter

import datetime
from schemas.query import QueryRequest, QueryResponse
from data.loader import get_students, get_clock
from dsl.visitor import run_query

router = APIRouter(
    prefix="/query",
    tags=["query"],
)


@router.post("/", response_model=QueryResponse)
async def query(body: QueryRequest):
    start = datetime.datetime.strptime(body.start, "%Y-%m-%dT%H:%M:%S%z").timestamp()
    end = datetime.datetime.strptime(body.end, "%Y-%m-%dT%H:%M:%S%z").timestamp()
    step = body.step / 1000  # step is passed in ms

    students = get_students()
    clock = get_clock()
    clock.time = start

    results = {}

    while clock.time <= end:
        results[datetime.datetime.utcfromtimestamp(clock.time).strftime("%Y-%m-%dT%H:%M:%S%z")] = [s.anon_id for s in run_query(body.query, students)]
        clock.time += step

    return results

