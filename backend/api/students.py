from fastapi import APIRouter

from schemas.student import Student

router = APIRouter(
    prefix="/students",
    tags=["students"],
)


@router.get("/{id}", response_model=Student)
async def get_student(id: str):
    return {"id": id}
