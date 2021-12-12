class AutotestResult:
    def __init__(self, conn, feedback_id,
                 score, request_time,
                 feedback_requester, feedback_time,
                 deliv, ref, is_master,
                 commiter, visible_score,
                 sha, parent_sha):
        self.conn = conn
        self.feedback_id = feedback_id
        self.score = score
        self.request_time = request_time
        self.feedback_requester = feedback_requester
        self.feedback_time = feedback_time
        self.deliv = deliv
        self.ref = ref
        self.is_master = is_master
        self.commiter = commiter
        self.visible_score = visible_score
        self.sha = sha
        self.parent_sha = parent_sha

def make_result(row, conn):
    result = AutotestResult(conn, *row)
    return result

class AutotestResultWithDelta(AutotestResult):
    def __init__(self, conn, feedback_id,
                 score, request_time,
                 feedback_requester, feedback_time,
                 deliv, ref, is_master,
                 commiter, visible_score,
                 sha, parent_sha, prev_time,
                 prev_score, prev_visible_score,
                 true_delta, visible_delta):
        self.conn = conn
        self.feedback_id = feedback_id
        self.score = score
        self.request_time = request_time
        self.feedback_requester = feedback_requester
        self.feedback_time = feedback_time
        self.deliv = deliv
        self.ref = ref
        self.is_master = is_master
        self.commiter = commiter
        self.visible_score = visible_score
        self.sha = sha
        self.parent_sha = parent_sha
        self.prev_time = prev_time
        self.prev_score = prev_score
        self.prev_visible_score = prev_visible_score
        self.true_delta = true_delta
        self.visible_delta = visible_delta

def make_result_with_delta(row, conn):
    result = AutotestResultWithDelta(conn, *row)
    return result

class QueueVisit:
    def __init__(self, conn, anon_id,
                 enqueue, dequeue,
                 answer_start, answer_finish,
                 answerer_id, qid):
        self.conn = conn
        self.anon_id = anon_id
        self.enqueue = enqueue
        self.answer_finish = answer_finish
        self.answerer_id = answerer_id
        self.qid = qid
        self.dequeue = dequeue
        self.answer_start = answer_start

def make_visit(row, conn):
    result = QueueVisit(conn, *row)
    return result

class PiazzaContribution:
    def __init__(self, conn, is_anonymous,
                 created_at, anon_id,
                 cid, post_id,
                 kind, is_project):
        self.conn = conn
        self.is_anonymous = is_anonymous
        self.created_at = created_at
        self.anon_id = anon_id
        self.cid = cid
        self.post_id = post_id
        self.kind = kind
        self.is_project = is_project

def make_contrib(row, conn):
    result = PiazzaContribution(conn, *row)
    return result


class Student:
    def __init__(self, conn, clock, anon_id, lab_time, withdrawn, score):
        self.conn = conn
        self.anon_id = anon_id
        self.lab_time = lab_time
        self.withdrawn = withdrawn
        self.score = score
        self.clock = clock

    def visits(self):
        return [make_visit(res, self.conn) for res in self.conn.sql('SELECT * from queue_visits WHERE anon_id = \"' + self.anon_id + '\" AND dequeue <' + str(self.clock.time))]

    def contributions(self):
        return [make_contrib(res, self.conn) for res in self.conn.sql('SELECT * from contributions WHERE anon_id = \"' + self.anon_id + '\" AND created_at <' + str(self.clock.time))]

    def autotest_results(self):
        return [make_result(res, self.conn) for res in self.conn.sql('SELECT res.* FROM autotest_results res, result_membership mem WHERE mem.anon_id = \"' + self.anon_id + '\" AND mem.feedback_id = res.feedback_id AND res.request_time <' + str(self.clock.time))]

    def autotest_results_with_dela(self):
        return [make_result(res, self.conn) for res in self.conn.sql('SELECT res.* FROM inf_autotest_results_with_deltas res, result_membership mem WHERE mem.anon_id = \"' + self.anon_id + '\" AND mem.feedback_id = res.feedback_id AND res.request_time <' + str(self.clock.time))]


def make_student(row, conn, clock):
    student = Student(conn, clock, row[0], row[1], row[2], row[3])
    return student
