from fastapi import APIRouter

from schemas.dataset import DatasetListResponse

router = APIRouter(
    prefix="/datasets",
    tags=["datasets"],
)


@router.get("/", response_model=DatasetListResponse)
async def get_datasets():
    return {
        "datasets": [
            {
                "id": "cpsc310",
                "name": "cpsc310",
                "start": 1610384400000,
                "end": 1618016700000,
                "attributes": [
                    "officeHours",
                    "piazzaPosts",
                    "numberOfCommits",
                    "lastFailure",
                    "coverage",
                    "lastOHVisitDay"
                ]
            },
            {
                "id": "cpsc110",
                "name": "cpsc110",
                "start": 0,
                "end": 1000000,
                "attributes": []
            },
            {
                "id": "cpsc311",
                "name": "cpsc311",
                "start": 0,
                "end": 10000000,
                "attributes": []
            }
        ]
    }
