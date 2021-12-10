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
                    "num_commits",
                    "num_piazza_posts",
                    "numberOfCommits"
                ]
            }
        ]
    }
