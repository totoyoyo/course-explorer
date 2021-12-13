from data.model.attribute.helpers import BasicAttribute


class FinalGrade(BasicAttribute):
    def get_value_for(self, student):
        return student.score
