from fastapi import APIRouter

from schemas.query import QueryRequest, QueryResponse

router = APIRouter(
    prefix="/query",
    tags=["query"],
)


@router.post("/", response_model=QueryResponse)
async def query(body: QueryRequest):
    if body.name == "Outcome":
        return {
            "2021-11-13T22:17:28.123Z": ["student1", "student2", "student3", "student4", "student5"],
            "2021-11-20T14:48:00.000Z": ["student1", "student3", "student4", "student5"],
            "2021-11-27T14:48:00.000Z": ["student3", "student4", "student5", "student7"]
        }
    elif body.name == "Indicator 1":
        return {
            "2021-11-13T22:17:28.123Z": [
                "student1",
                "student2",
                "student3",
                "student4",
                "student5",
                "student6",
                "student7"
            ],
            "2021-11-20T14:48:00.000Z": ["student1", "student3", "student4", "student5", "student7"],
            "2021-11-27T14:48:00.000Z": ["student1", "student2", "student3", "student4", "student5", "student7"]
        }
    elif body.name == "Indicator 2":
        return {
            "2021-11-13T22:17:28.123Z": ["student1", "student3"],
            "2021-11-20T14:48:00.000Z": ["student1", "student3", "student5"],
            "2021-11-27T14:48:00.000Z": ["student1", "student3", "student5"]
        }
    elif body.name == "Indicator 3":
        return {
            "2021-11-13T22:17:28.123Z": ["student1", "student3", "student5"],
            "2021-11-20T14:48:00.000Z": ["student1", "student5", "student7"],
            "2021-11-27T14:48:00.000Z": ["student1"]
        }
    else:
        return {}
