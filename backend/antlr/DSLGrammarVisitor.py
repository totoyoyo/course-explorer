# Generated from DSLGrammar.g4 by ANTLR 4.9.3
from antlr4 import *
if __name__ is not None and "." in __name__:
    from .DSLGrammarParser import DSLGrammarParser
else:
    from DSLGrammarParser import DSLGrammarParser

# This class defines a complete generic visitor for a parse tree produced by DSLGrammarParser.

class DSLGrammarVisitor(ParseTreeVisitor):

    # Visit a parse tree produced by DSLGrammarParser#query.
    def visitQuery(self, ctx:DSLGrammarParser.QueryContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#some_filter.
    def visitSome_filter(self, ctx:DSLGrammarParser.Some_filterContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#logic.
    def visitLogic(self, ctx:DSLGrammarParser.LogicContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#binary.
    def visitBinary(self, ctx:DSLGrammarParser.BinaryContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#comparable.
    def visitComparable(self, ctx:DSLGrammarParser.ComparableContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#number.
    def visitNumber(self, ctx:DSLGrammarParser.NumberContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#modified_attributes.
    def visitModified_attributes(self, ctx:DSLGrammarParser.Modified_attributesContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#granularity_operator.
    def visitGranularity_operator(self, ctx:DSLGrammarParser.Granularity_operatorContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#aggr_op.
    def visitAggr_op(self, ctx:DSLGrammarParser.Aggr_opContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#arithmetic.
    def visitArithmetic(self, ctx:DSLGrammarParser.ArithmeticContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#string.
    def visitString(self, ctx:DSLGrammarParser.StringContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#time.
    def visitTime(self, ctx:DSLGrammarParser.TimeContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#student_attribute.
    def visitStudent_attribute(self, ctx:DSLGrammarParser.Student_attributeContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#attribute.
    def visitAttribute(self, ctx:DSLGrammarParser.AttributeContext):
        return self.visitChildren(ctx)


    # Visit a parse tree produced by DSLGrammarParser#time_lit.
    def visitTime_lit(self, ctx:DSLGrammarParser.Time_litContext):
        return self.visitChildren(ctx)



del DSLGrammarParser