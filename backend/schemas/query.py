from typing import List, Dict
from datetime import datetime

from pydantic import BaseModel


class QueryResponse(BaseModel):
    __root__: Dict[datetime, List[str]]


class QueryRequest(BaseModel):
    start: datetime
    end: datetime
    step: int
    name: str
    query: str
