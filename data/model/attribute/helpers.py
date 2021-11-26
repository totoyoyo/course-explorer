from abc import ABC, abstractmethod
from enum import Enum


class Granularity(Enum):
    DAILY = 1
    WEEKLY = 2
    MONTHLY = 3
    MAX = 4

class Aggregation(Enum):
    LATEST = 1
    AVG = 2
    MAX = 3
    MIN = 4
    SUM = 5

class BasicAttribute(ABC):

    @abstractmethod
    def get_value_for(self, student):
        pass


class TimeVaryingAttribute(BasicAttribute):

    def __init__(self):
        self.granularity = Granularity.MAX
        self.aggregation = Aggregation.LATEST

    def get_value_for(self, student):
        attr_list = self.get_time_attribute_list(student)  # returns a list of tuples (time, data)

        split_lists = [attr_list]
        split_lists = [self.reduce_attribute_list(student, x) for x in split_lists]

        match self.aggregation:
            case Aggregation.LATEST:
                return split_lists[-1]
            case Aggregation.AVG:
                return sum(split_lists) / len(split_lists)
            case Aggregation.MAX:
                return max(split_lists)
            case Aggregation.MIN:
                return min(split_lists)
            case Aggregation.SUM:
                return sum(split_lists)



    def set_granularity(self, target):
        self.granularity = target

    def set_aggregationy(self, target):
        self.aggregation = target

    @abstractmethod
    def get_time_attribute_list(self, student):
        pass

    @abstractmethod
    def reduce_attribute_list(self, student, list):
        pass

