import db_connection
import model.defs as student
import model.Clock as clock
import model.attribute.num_piazza_posts as num_posts

students = []
num_posts = num_posts.NumPiazzaPosts()

for row in db_connection.sql('SELECT * from users_scores'):
    s = student.make_student(row, db_connection, clock.Clock(9999999999999999999))
    print(num_posts.get_value_for(s))
    students.append(s)
