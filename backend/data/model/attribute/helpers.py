from abc import ABC, abstractmethod
from enum import Enum
from functools import reduce


class Granularity(Enum):
    DAILY = 1
    WEEKLY = 2
    MONTHLY = 3
    MAX = 4


DAY_SECONDS = 60 * 60 * 24
WEEKLY_SECONDS = DAY_SECONDS * 7
MONTHLY_SECONDS = DAY_SECONDS * 30  # very rough


def min_func(a, b):
    return a[0] if a[0] < b[0] else b[0]


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

    def generate_split_lists(self, attr_list):
        split_lists = {}
        if len(attr_list) < 1:
            return []
        if len(attr_list) == 1:
            return [[attr_list[0]]]

        base_time = reduce(min_func, attr_list)

        for attr in attr_list:
            rel_time = attr[0] - base_time
            steps = rel_time // self.get_granularity_step()
            if steps not in split_lists:
                split_lists[steps] = []
            split_lists[steps].append(attr)

        return split_lists.items()

    def set_granularity(self, target):
        self.granularity = target

    def get_granularity_step(self):
        match self.granularity:
            case Granularity.DAILY:
                return DAY_SECONDS
            case Granularity.WEEKLY:
                return WEEKLY_SECONDS
            case Granularity.MONTHLY:
                return MONTHLY_SECONDS
            case Granularity.MAX:
                return float('inf')

    def set_aggregation(self, target):
        self.aggregation = target

    @abstractmethod
    def get_time_attribute_list(self, student):
        pass

    @abstractmethod
    def reduce_attribute_list(self, student, list):
        pass
