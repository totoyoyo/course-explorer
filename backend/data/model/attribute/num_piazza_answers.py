from data.model.attribute.helpers import TimeAccumulatingAttribute


class NumPiazzaAnswers(TimeAccumulatingAttribute):
    def get_time_attribute_list(self, student):
        return [(contrib.created_at, contrib) for contrib in student.contributions()
                if contrib.kind == 'started_off_s_answer' or contrib.kind == 'updated_s_answer']

    def reduce_attribute_list(self, student, alist):
        return len(alist)
