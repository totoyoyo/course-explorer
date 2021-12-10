from typing import List, Dict
from datetime import datetime

from pydantic import BaseModel


class QueryResponse(BaseModel):
    results: Dict[datetime, List[str]]
    attributes: List[str]


class QueryRequest(BaseModel):
    start: str
    end: str
    step: int
    name: str
    query: str
