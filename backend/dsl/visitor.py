from antlr.DSLGrammarLexer import DSLGrammarLexer
from antlr.DSLGrammarParser import DSLGrammarParser
from antlr.DSLGrammarVisitor import DSLGrammarVisitor
from antlr4.error.ErrorListener import ErrorListener
from antlr4 import InputStream, CommonTokenStream
from datetime import datetime
import data.model.attribute.helpers as attr
import data.model.attribute.factory as fact


class OurVisitor(DSLGrammarVisitor):

    def __init__(self, student):
        super().__init__()
        self.student = student

    def visitModified_attributes(self,
                                 ctx: DSLGrammarParser.Modified_attributesContext):
        return super().visitModified_attributes(ctx)

    def visitGranularity_operator(self,
                                  ctx: DSLGrammarParser.Granularity_operatorContext):
        return super().visitGranularity_operator(ctx)

    def visitQuery(self, ctx: DSLGrammarParser.QueryContext):
        # fill this
        return super().visitQuery(ctx)

    def visitSome_filter(self, ctx: DSLGrammarParser.Some_filterContext):
        # Some sample outline
        return super().visitSome_filter(ctx)

    def visitLogic(self, ctx: DSLGrammarParser.LogicContext):
        if len(ctx.some_filter()) == 2:
            if ctx.getTokens(2)[0].getPayload().text == 'AND':
                return super().visitSome_filter(ctx.some_filter()[0]) and super().visitSome_filter(ctx.some_filter()[1])
            return super().visitSome_filter(ctx.some_filter()[0]) or super().visitSome_filter(ctx.some_filter()[1])

        return not super().visitSome_filter(ctx.some_filter()[0])

    def visitBinary(self, ctx: DSLGrammarParser.BinaryContext):
        comp1 = super().visitComparable(ctx.comparable()[0])
        comp2 = super().visitComparable(ctx.comparable()[1])
        if len(ctx.getTokens(6)) > 0:
            return comp1 > comp2
        if len(ctx.getTokens(7)) > 0:
            return comp1 < comp2
        if len(ctx.getTokens(8)) > 0:
            return comp1 <= comp2
        if len(ctx.getTokens(9)) > 0:
            return comp1 >= comp2
        if len(ctx.getTokens(10)) > 0:
            return comp1 != comp2
        if len(ctx.getTokens(11)) > 0:
            return comp1 == comp2

    def visitComparable(self, ctx: DSLGrammarParser.ComparableContext):
        res = super().visitComparable(ctx)
        if isinstance(res, attr.BasicAttribute):
            res = res.get_value_for(self.student)  # when the attribute is compared we compute just in time
        return res

    def visitNumber(self, ctx: DSLGrammarParser.NumberContext):
        res = super().visitNumber(ctx)
        if isinstance(res, attr.BasicAttribute):
            return res.get_value_for(self.student)  # when the attribute is compared we compute just in time
        return float(ctx.getText())

    def visitModified_attributes(self, ctx: DSLGrammarParser.Modified_attributesContext):
        res = super().visitModified_attributes(ctx)

        if isinstance(res, attr.TimeVaryingAttribute):
            if ctx.granularity_operator():
                return self.apply_granularity(ctx, res)
            if ctx.aggr_op():
                return self.apply_aggregation(ctx, res)

        return res

    def apply_granularity(self,
                          ctx: DSLGrammarParser.Modified_attributesContext, res: attr.TimeVaryingAttribute):
        if isinstance(res, attr.TimeVaryingAttribute):
            if len(ctx.getTokens(12)) > 0:
                res.set_granularity(attr.Granularity.DAILY)
            elif len(ctx.getTokens(13)) > 0:
                res.set_granularity(attr.Granularity.WEEKLY)
            elif len(ctx.getTokens(14)) > 0:
                res.set_granularity(attr.Granularity.MONTHLY)
            elif len(ctx.getTokens(15)) > 0:
                res.set_granularity(attr.Granularity.MAX)  # TODO remove this
            elif len(ctx.getTokens(16)) > 0:
                res.set_granularity(attr.Granularity.MAX)
        return res

    def apply_aggregation(self, ctx: DSLGrammarParser.Modified_attributesContext, res: attr.TimeVaryingAttribute):
        if len(ctx.getTokens(17)) > 0:
            res.set_aggregation(attr.Aggregation.AVG)
        elif len(ctx.getTokens(18)) > 0:
            res.set_aggregation(attr.Aggregation.COUNT)
        elif len(ctx.getTokens(19)) > 0:
            res.set_aggregation(attr.Aggregation.MAX)
        elif len(ctx.getTokens(20)) > 0:
            res.set_aggregation(attr.Aggregation.MIN)
        elif len(ctx.getTokens(21)) > 0:
            res.set_aggregation(attr.Aggregation.SUM)
        elif len(ctx.getTokens(22)) > 0:
            res.set_aggregation(attr.Aggregation.LATEST)
        return res

    def visitAggr_op(self, ctx: DSLGrammarParser.Aggr_opContext):
        return super().visitAggr_op(ctx)

    def visitArithmetic(self, ctx: DSLGrammarParser.ArithmeticContext):
        num1 = super().visitNumber(ctx.number()[0])
        num2 = super().visitNumber(ctx.number()[1])
        if len(ctx.getTokens(23)):
            return num1 + num2
        if len(ctx.getTokens(24)):
            return num1 - num2
        if len(ctx.getTokens(25)):
            return num1 * num2
        if len(ctx.getTokens(26)):
            return num1 / num2

    def visitString(self, ctx: DSLGrammarParser.StringContext):
        return ctx.getText()

    def visitTime(self, ctx: DSLGrammarParser.TimeContext):
        return datetime.strptime(ctx.getText(), '%a %B %d %H:%M:%S +0800 %Y')

    def visitStudent_attribute(self,
                               ctx: DSLGrammarParser.Student_attributeContext):
        return super().visitStudent_attribute(ctx)

    def visitAttribute(self, ctx: DSLGrammarParser.AttributeContext):
        return fact.make_attribute(ctx.getText())

    def visitTime_lit(self, ctx: DSLGrammarParser.Time_litContext):
        return super().visitTime_lit(ctx)

    def aggregateResult(self, aggregate, nextResult):
        if nextResult is not None:
            return nextResult
        return aggregate


class OurErrorListener(ErrorListener):
    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):
        raise Exception("Something happened")


def run_query(query, istudents):
    data = InputStream(query)
    # for throwing exception
    error_listener = OurErrorListener()

    # Lexer
    lexer = DSLGrammarLexer(data)
    lexer.addErrorListener(error_listener)
    stream = CommonTokenStream(lexer)

    # Parser
    parser = DSLGrammarParser(stream)
    parser.addErrorListener(error_listener)
    tree = parser.query()

    return [ii for ii in istudents if OurVisitor(ii).visit(tree)]

# from data.loader import get_students
# from data.loader import get_clock
# get_clock().time = 99999999999999
# print(run_query("((monthly(student.num_piazza_posts) > 2) AND (student.num_piazza_posts <12))", get_students()))
