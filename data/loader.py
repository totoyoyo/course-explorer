import db_connection
import model.Student as student
import model.Clock as clock

students = []

for row in db_connection.sql('SELECT * from users_scores'):
    s = student.make_student(row, db_connection, clock.Clock(9999999999999999999))
    students.append(s)
    print(s.autotest_results())