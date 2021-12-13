from data.model.attribute.helpers import TimeVaryingAttribute


class VisibleScore(TimeVaryingAttribute):
    def __init__(self, deliv):
        super().__init__()
        self.deliv = deliv

    def get_time_attribute_list(self, student):
        return [(contrib.request_time, contrib) for contrib in student.autotest_results() if
                contrib.deliv == self.deliv and contrib.visible_score is not None]

    def reduce_attribute_list(self, student, alist):
        alist.sort(key=lambda x: x.request_time)  # sort so latest result is at end
        return alist[-1].visible_score  # take latest score


class VisibleScoreC1(VisibleScore):
    def __init__(self):
        super().__init__("c1")


class VisibleScoreC2(VisibleScore):
    def __init__(self):
        super().__init__("c2")


class VisibleScoreC3(VisibleScore):
    def __init__(self):
        super().__init__("c3")
