from data.model.attribute.helpers import TimeVaryingAttribute


class Score(TimeVaryingAttribute):
    def __init__(self, deliv):
        super().__init__()
        self.deliv = deliv

    def get_time_attribute_list(self, student):
        return [(contrib.request_time, contrib) for contrib in student.autotest_results() if contrib.deliv == self.deliv]

    def reduce_attribute_list(self, student, alist):
        alist.sort(key=lambda x: x.request_time)     # sort so latest result is at end
        return alist[-1].score                       # take latest score

class ScoreC0(Score):
    def __init__(self):
        super().__init__("c0")

class ScoreC1(Score):
    def __init__(self):
        super().__init__("c1")


class ScoreC2(Score):
    def __init__(self):
        super().__init__("c2")


class ScoreC3(Score):
    def __init__(self):
        super().__init__("c3")