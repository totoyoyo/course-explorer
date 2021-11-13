class Student:

    def __init__(self, conn, clock, anon_id, lab_time, withdrawn, score):
        self.conn = conn
        self.anon_id = anon_id
        self.lab_time = lab_time
        self.withdrawn = withdrawn
        self.score = score
        self.clock = clock

    def visits(self):
        return self.conn.sql('SELECT * from queue_visits WHERE anon_id = \"' + self.anon_id + '\" AND dequeue <' + str(self.clock.time))

    def contributions(self):
        return self.conn.sql('SELECT * from contributions WHERE anon_id = \"' + self.anon_id + '\" AND created_at <' + str(self.clock.time))

    def autotest_results(self):
        return self.conn.sql('SELECT res.* FROM autotest_results res, result_membership mem WHERE mem.anon_id = \"' + self.anon_id + '\" AND mem.feedback_id = res.feedback_id AND res.request_time <' + str(self.clock.time))




def make_student(row, conn, clock):
    student = Student(conn, clock, row[0], row[1], row[2], row[3])
    return student
