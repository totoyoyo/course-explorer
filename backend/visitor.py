from antlr.DSLGrammarParser import DSLGrammarParser
from antlr.DSLGrammarVisitor import DSLGrammarVisitor

class OurVisitor(DSLGrammarVisitor):

    def visitQuery(self, ctx: DSLGrammarParser.QueryContext):
        #fill this
        return super().visitQuery(ctx)

    def visitSome_filter(self, ctx: DSLGrammarParser.Some_filterContext):
        # Some sample outline
        if ctx.logic():
            pass
        elif ctx.binary():
            pass
        elif ctx.time_op():
            pass
        else:
            return super().visitSome_filter(ctx)

    def visitLogic(self, ctx: DSLGrammarParser.LogicContext):
        return super().visitLogic(ctx)

    def visitTime_op(self, ctx: DSLGrammarParser.Time_opContext):
        return super().visitTime_op(ctx)

    def visitBinary(self, ctx: DSLGrammarParser.BinaryContext):
        return super().visitBinary(ctx)

    def visitComparable(self, ctx: DSLGrammarParser.ComparableContext):
        return super().visitComparable(ctx)

    def visitNumber(self, ctx: DSLGrammarParser.NumberContext):
        return super().visitNumber(ctx)

    def visitGranularity_result(self,
                                ctx: DSLGrammarParser.Granularity_resultContext):
        return super().visitGranularity_result(ctx)

    def visitArithmetic(self, ctx: DSLGrammarParser.ArithmeticContext):
        return super().visitArithmetic(ctx)

    def visitString(self, ctx: DSLGrammarParser.StringContext):
        return super().visitString(ctx)

    def visitTime(self, ctx: DSLGrammarParser.TimeContext):
        return super().visitTime(ctx)

    def visitStudent_attribute(self,
                               ctx: DSLGrammarParser.Student_attributeContext):
        return super().visitStudent_attribute(ctx)

    def visitAttribute(self, ctx: DSLGrammarParser.AttributeContext):
        return super().visitAttribute(ctx)

    def visitTime_lit(self, ctx: DSLGrammarParser.Time_litContext):
        return super().visitTime_lit(ctx)