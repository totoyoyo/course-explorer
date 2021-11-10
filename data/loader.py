import db_connection
import model.Student as student

students = []

for row in db_connection.sql('SELECT * from users_scores'):
    s = student.make_student(row, db_connection)
    students.append(s)
    print(s.contributions())