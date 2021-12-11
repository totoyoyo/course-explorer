from data.model.attribute.helpers import TimeVaryingAttribute

class NumOfficeHours(TimeVaryingAttribute):
    def get_time_attribute_list(self, student):
        return [(visit.enqueue, visit) for visit in student.visits()]

    def reduce_attribute_list(self, student, list):
        return len(list)