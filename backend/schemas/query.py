from typing import List
from datetime import datetime

from pydantic import BaseModel
from .student import StudentBase


class QueryResponse(BaseModel):
    result: List[StudentBase]


class QueryRequest(BaseModel):
    start: datetime
    end: datetime
    step: str
    query: str
