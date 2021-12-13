import data.db_connection
import data.model.defs as student
import data.model.Clock as clock

students = []
clock = clock.Clock(0)

for row in data.db_connection.sql('SELECT * from users_scores where withdrawn = 0'):
    s = student.make_student(row, data.db_connection, clock)
    students.append(s)


def get_students():
    return students

def get_clock():
    return clock