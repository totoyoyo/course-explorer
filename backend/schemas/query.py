from typing import List

from pydantic import BaseModel
from .student import StudentBase


class QueryResult(BaseModel):
    result: List[StudentBase]


class QueryBody(BaseModel):
    start: str
    end: str
    step: str
    query: str