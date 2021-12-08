from typing import List
from datetime import datetime

from pydantic import BaseModel


class Dataset(BaseModel):
    id: str
    name: str
    start: datetime
    end: datetime
    attributes: List[str]


class DatasetListResponse(BaseModel):
    datasets: List[Dataset]
