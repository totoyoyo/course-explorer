from data.model.attribute.helpers import TimeAccumulatingAttribute

TO_SECONDS = 1000

class TimeSpentWithTAOfficeHours(TimeAccumulatingAttribute):
    def get_time_attribute_list(self, student):
        return [(visit.answer_start,
                 (visit.answer_finish - visit.answer_start) / TO_SECONDS if visit.answer_finish is not None else 0)
                for visit in
                student.visits()]

    def reduce_attribute_list(self, student, list):
        return sum(list)
