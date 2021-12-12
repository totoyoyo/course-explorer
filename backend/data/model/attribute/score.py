from data.model.attribute.helpers import TimeVaryingAttribute


class Score(TimeVaryingAttribute):
    def get_time_attribute_list(self, student):
        return [(contrib.request_time, contrib) for contrib in student.autotest_results()]

    def reduce_attribute_list(self, student, alist):
        alist.sort(key=lambda x: x.request_time)     # sort so latest result is at end
        return alist[-1].score                       # take latest score
