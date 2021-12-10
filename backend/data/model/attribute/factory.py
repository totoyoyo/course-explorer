import data.model.attribute.num_piazza_posts as num_piazza_posts
import data.model.attribute.num_commits as num_commits


def make_attribute(name):
    match name:
        case 'num_piazza_posts':
            return num_piazza_posts.NumPiazzaPosts()
        case 'num_commits':
            return num_commits.NumCommits()

def get_all_attributes():
    return ['num_piazza_posts', 'num_commits']