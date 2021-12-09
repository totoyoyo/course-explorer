import db_connection
import model.defs as student
import model.Clock as clock

students = []
clock = clock.Clock(0)

for row in db_connection.sql('SELECT * from users_scores'):
    s = student.make_student(row, db_connection, clock)
    students.append(s)


def get_students():
    return students
