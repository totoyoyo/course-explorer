import data.model.attribute.num_piazza_posts as num_piazza_posts
import data.model.attribute.num_commits as num_commits
import data.model.attribute.num_office_hours as num_office_hours
import data.model.attribute.final_grade as final_grade
import data.model.attribute.time_spent_with_ta_office_hours as time_spent_with_ta_office_hours
import data.model.attribute.score.score as score
import data.model.attribute.score.visible_score as visible_score
import data.model.attribute.delta.total_delta as total_delta
import data.model.attribute.delta.visible_total_delta as visible_total_delta
import data.model.attribute.delta.avg_delta as avg_delta
import data.model.attribute.delta.visible_avg_delta as visible_avg_delta

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
        case 'score_c0':
            return score.ScoreC0()
        case 'score_c1':
            return score.ScoreC1()
        case 'score_c2':
            return score.ScoreC2()
        case 'score_c3':
            return score.ScoreC3()
        case 'visible_score_c1':
            return visible_score.VisibleScoreC1()
        case 'visible_score_c2':
            return visible_score.VisibleScoreC2()
        case 'visible_score_c3':
            return visible_score.VisibleScoreC3()
        case 'visible_total_delta':
            return visible_total_delta.VisibleTotalDelta()
        case 'total_delta':
            return total_delta.TotalDelta()
        case 'visible_avg_delta':
            return visible_avg_delta.VisibleAvgDelta()
        case 'avg_delta':
            return avg_delta.AvgDelta()


def get_all_attributes():
    return ['num_piazza_posts', 'num_commits',
            'num_office_hours', 'final_grade',
            'time_spent_with_ta_office_hours', 'score_c0',
            'score_c1', 'score_c2', 'score_c3', 'visible_score_c1',
            'visible_score_c2', 'visible_score_c3',
            'visible_total_delta', 'total_delta',
            'visible_avg_delta', 'avg_delta']


from data.loader import get_students, get_clock


# def test_attributes():
#     students = get_students()
#     get_clock().time = 999999999999999
#
#     for a in get_all_attributes():
#         attr = make_attribute(a)
#         print(a + "== " + " ".join(str(x) for x in [attr.get_value_for(s) for s in students]))
#
#
# test_attributes()
