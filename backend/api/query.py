from fastapi import APIRouter

from schemas.query import QueryRequest, QueryResponse

router = APIRouter(
    prefix="/query",
    tags=["query"],
)


@router.post("/", response_model=QueryResponse)
async def query(body: QueryRequest):
    print(body)
    return {"result": [{"id": "123"}]}
