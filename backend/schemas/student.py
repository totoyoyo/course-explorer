from pydantic import BaseModel


class StudentBase(BaseModel):
    id: str


class Student(BaseModel):
    id: str
