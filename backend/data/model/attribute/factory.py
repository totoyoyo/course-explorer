import data.model.attribute.num_piazza_posts as num_piazza_posts
import data.model.attribute.num_commits as num_commits
import data.model.attribute.num_office_hours as num_office_hours
import data.model.attribute.final_grade as final_grade
import data.model.attribute.time_spent_with_ta_office_hours as time_spent_with_ta_office_hours
import data.model.attribute.score as score
import data.model.attribute.visible_score as visible_score

def make_attribute(name):
    match name:
        case 'num_piazza_posts':
            return num_piazza_posts.NumPiazzaPosts()
        case 'num_commits':
            return num_commits.NumCommits()
        case 'num_office_hours':
            return num_office_hours.NumOfficeHours()
        case 'final_grade':
            return final_grade.FinalGrade()
        case 'time_spent_with_ta_office_hours':
            return time_spent_with_ta_office_hours.TimeSpentWithTAOfficeHours()
        case 'score':
            return score.Score()
        case 'time_spent_with_ta_office_hours':
            return visible_score.VisibleScore()

def get_all_attributes():
    return ['num_piazza_posts', 'num_commits',
            'num_office_hours', 'final_grade',
            'time_spent_with_ta_office_hours', 'score',
            'visible_score']
