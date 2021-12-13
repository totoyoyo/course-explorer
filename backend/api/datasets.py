from fastapi import APIRouter

from schemas.dataset import DatasetListResponse
from data.model.attribute.factory import get_all_attributes

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
                "attributes": get_all_attributes()
            }
        ]
    }
