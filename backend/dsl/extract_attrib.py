from antlr.DSLGrammarLexer import DSLGrammarLexer
from antlr.DSLGrammarParser import DSLGrammarParser
from antlr.DSLGrammarVisitor import DSLGrammarVisitor
from antlr4.error.ErrorListener import ErrorListener
from antlr4 import InputStream, CommonTokenStream


class AttributeExtractingVisitor(DSLGrammarVisitor):

    def __init__(self):
        super().__init__()

    def visitQuery(self, ctx: DSLGrammarParser.QueryContext):
        # fill this
        return super().visitQuery(ctx)

    def visitSome_filter(self, ctx: DSLGrammarParser.Some_filterContext):
        # Some sample outline
        return super().visitSome_filter(ctx)

    def visitLogic(self, ctx: DSLGrammarParser.LogicContext):
        return super().visitLogic(ctx)

    def visitBinary(self, ctx: DSLGrammarParser.BinaryContext):
        return super().visitBinary(ctx)

    def visitComparable(self, ctx: DSLGrammarParser.ComparableContext):
        return super().visitComparable(ctx)

    def visitNumber(self, ctx: DSLGrammarParser.NumberContext):
        return super().visitNumber(ctx)

    def visitModified_attributes(self, ctx:DSLGrammarParser.Modified_attributesContext):
        return super().visitModified_attributes(ctx)

    def visitAggr_op(self, ctx:DSLGrammarParser.Aggr_opContext):
        return super().visitAggr_op(ctx)

    def visitArithmetic(self, ctx: DSLGrammarParser.ArithmeticContext):
        return self.visitArithmetic(ctx)

    def visitString(self, ctx: DSLGrammarParser.StringContext):
        return super().visitString(ctx)

    def visitTime(self, ctx: DSLGrammarParser.TimeContext):
        return super().visitTime(ctx)

    def visitStudent_attribute(self,
                               ctx: DSLGrammarParser.Student_attributeContext):
        return super().visitStudent_attribute(ctx)

    def visitAttribute(self, ctx: DSLGrammarParser.AttributeContext):
        return {ctx.getText()}

    def visitTime_lit(self, ctx: DSLGrammarParser.Time_litContext):
        return super().visitTime_lit(ctx)

    # we build a set of all the attributes
    def aggregateResult(self, aggregate, nextResult):
        if not isinstance(aggregate, set):
            aggregate = set()
        if isinstance(nextResult, set):
            aggregate = aggregate.union(nextResult)
        return aggregate


class OurErrorListener(ErrorListener):
    def syntaxError(self, recognizer, offendingSymbol, line, column, msg, e):
        raise Exception("Something happened")


def extract_attributes(query):
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

    return AttributeExtractingVisitor().visit(tree)