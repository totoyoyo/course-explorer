from fastapi import APIRouter

from schemas.query import QueryBody, QueryResult

router = APIRouter(
    prefix="/query",
    tags=["query"],
)


@router.post("/", response_model=QueryResult)
async def query(body: QueryBody):
    return {"result": [{"id": "123"}]}
