from fastapi import APIRouter

from schemas.dataset import DatasetListResponse

router = APIRouter(
    prefix="/datasets",
    tags=["datasets"],
)


@router.get("/", response_model=DatasetListResponse)
async def get_datasets():
    return {"datasets": []}
