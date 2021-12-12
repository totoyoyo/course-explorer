from data.model.attribute.helpers import TimeAccumulatingAttribute

class NumCommits(TimeAccumulatingAttribute):
    def get_time_attribute_list(self, student):
        return [(contrib.request_time, contrib) for contrib in student.autotest_results()]

    def reduce_attribute_list(self, student, list):
        return len(list)