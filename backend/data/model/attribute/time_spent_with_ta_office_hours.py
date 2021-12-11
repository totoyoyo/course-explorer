from data.model.attribute.helpers import TimeVaryingAttribute


class TimeSpentWithTAOfficeHours(TimeVaryingAttribute):
    def get_time_attribute_list(self, student):
        return [(visit.answer_start,
                 visit.answer_finish - visit.answer_start if visit.answer_finish is not None else 0) for visit in
                student.visits()]

    def reduce_attribute_list(self, student, list):
        return sum(list)
