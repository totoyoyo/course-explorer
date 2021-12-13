from data.model.attribute.helpers import TimeAccumulatingAttribute


class TotalDelta(TimeAccumulatingAttribute):
    def get_time_attribute_list(self, student):
        return [(contrib.request_time, contrib) for contrib in student.autotest_results_with_delta()]

    def reduce_attribute_list(self, student, alist):
        return sum([a.true_delta for a in alist])