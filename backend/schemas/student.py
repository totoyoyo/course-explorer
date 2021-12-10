from typing import List, Union, Dict, Optional
from datetime import datetime

from pydantic import BaseModel


class Student(BaseModel):
    id: str


class StudentList(BaseModel):
    ids: List[str]


class StudentDetail(BaseModel):
    id: str
    attributes: Dict[str, Union[float, str]]


class StudentDetailsRequest(BaseModel):
    datasetId: str
    start: datetime
    end: datetime
    step: int
    attributes: Optional[List[str]]
    ids: Optional[List[str]]


class StudentDetailsResponse(BaseModel):
    __root__: Dict[datetime, List[StudentDetail]]
