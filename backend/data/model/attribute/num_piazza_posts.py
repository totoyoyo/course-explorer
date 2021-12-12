from data.model.attribute.helpers import TimeAccumulatingAttribute

class NumPiazzaPosts(TimeAccumulatingAttribute):
    def get_time_attribute_list(self, student):
        return [(contrib.created_at, contrib) for contrib in student.contributions()]

    def reduce_attribute_list(self, student, list):
        return len(list)