from fastapi import APIRouter

router = APIRouter(
    prefix="/students",
    tags=["students"],
)


@router.get("/")
async def get_students():
    return [{"name": "student1"},
            {"name": "student2"},
            {"name": "student3"},
            {"name": "student4"},
            {"name": "student5"},
            {"name": "student6"},
            {"name": "student7"},
            {"name": "student8"},
            {"name": "student9"},
            {"name": "student10"},
            {"name": "student11"},
            {"name": "student12"},
            {"name": "student13"},
            {"name": "student14"},
            {"name": "student15"},
            {"name": "student16"},
            {"name": "student17"},
            {"name": "student18"}]

