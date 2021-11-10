class Student:

    def __init__(self, conn, anon_id, lab_time, withdrawn, score):
        self.conn = conn
        self.anon_id = anon_id
        self.lab_time = lab_time
        self.withdrawn = withdrawn
        self.score = score

    def visits(self):
        return self.conn.sql('SELECT * from queue_visits WHERE anon_id = \"' + self.anon_id + '\"')

    def contributions(self):
        return self.conn.sql('SELECT * from contributions WHERE anon_id = \"' + self.anon_id + '\"')




def make_student(row, conn):
    student = Student(conn, row[0], row[1], row[2], row[3])
    return student
