# Generated from DSLGrammar.g4 by ANTLR 4.9.3
# encoding: utf-8
from antlr4 import *
from io import StringIO
import sys
if sys.version_info[1] > 5:
	from typing import TextIO
else:
	from typing.io import TextIO


def serializedATN():
    with StringIO() as buf:
        buf.write("\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\"")
        buf.write("l\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b")
        buf.write("\t\b\4\t\t\t\4\n\t\n\4\13\t\13\4\f\t\f\4\r\t\r\4\16\t")
        buf.write("\16\4\17\t\17\4\20\t\20\3\2\3\2\3\3\3\3\5\3%\n\3\3\4\3")
        buf.write("\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\5\4\62\n\4\3\5")
        buf.write("\3\5\3\5\3\5\3\5\3\5\3\6\3\6\3\6\3\6\5\6>\n\6\3\7\3\7")
        buf.write("\3\7\5\7C\n\7\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b\3\b")
        buf.write("\3\b\5\bP\n\b\3\t\3\t\3\n\3\n\3\13\3\13\3\13\3\13\3\13")
        buf.write("\3\13\3\f\3\f\5\f^\n\f\3\r\3\r\3\16\3\16\3\16\3\17\3\17")
        buf.write("\3\20\3\20\3\20\3\20\3\20\3\20\2\2\21\2\4\6\b\n\f\16\20")
        buf.write("\22\24\26\30\32\34\36\2\7\3\2\4\5\3\2\b\r\3\2\16\22\3")
        buf.write("\2\23\30\3\2\31\34\2f\2 \3\2\2\2\4$\3\2\2\2\6\61\3\2\2")
        buf.write("\2\b\63\3\2\2\2\n=\3\2\2\2\fB\3\2\2\2\16O\3\2\2\2\20Q")
        buf.write("\3\2\2\2\22S\3\2\2\2\24U\3\2\2\2\26]\3\2\2\2\30_\3\2\2")
        buf.write("\2\32a\3\2\2\2\34d\3\2\2\2\36f\3\2\2\2 !\5\4\3\2!\3\3")
        buf.write("\2\2\2\"%\5\6\4\2#%\5\b\5\2$\"\3\2\2\2$#\3\2\2\2%\5\3")
        buf.write("\2\2\2&\'\7\3\2\2\'(\5\4\3\2()\t\2\2\2)*\5\4\3\2*+\7\6")
        buf.write("\2\2+\62\3\2\2\2,-\7\3\2\2-.\7\7\2\2./\5\4\3\2/\60\7\6")
        buf.write("\2\2\60\62\3\2\2\2\61&\3\2\2\2\61,\3\2\2\2\62\7\3\2\2")
        buf.write("\2\63\64\7\3\2\2\64\65\5\n\6\2\65\66\t\3\2\2\66\67\5\n")
        buf.write("\6\2\678\7\6\2\28\t\3\2\2\29>\5\f\7\2:>\5\30\r\2;>\5\26")
        buf.write("\f\2<>\5\32\16\2=9\3\2\2\2=:\3\2\2\2=;\3\2\2\2=<\3\2\2")
        buf.write("\2>\13\3\2\2\2?C\7\37\2\2@C\5\24\13\2AC\5\16\b\2B?\3\2")
        buf.write("\2\2B@\3\2\2\2BA\3\2\2\2C\r\3\2\2\2DP\5\32\16\2EF\5\20")
        buf.write("\t\2FG\7\3\2\2GH\5\16\b\2HI\7\6\2\2IP\3\2\2\2JK\5\22\n")
        buf.write("\2KL\7\3\2\2LM\5\16\b\2MN\7\6\2\2NP\3\2\2\2OD\3\2\2\2")
        buf.write("OE\3\2\2\2OJ\3\2\2\2P\17\3\2\2\2QR\t\4\2\2R\21\3\2\2\2")
        buf.write("ST\t\5\2\2T\23\3\2\2\2UV\7\3\2\2VW\5\f\7\2WX\t\6\2\2X")
        buf.write("Y\5\f\7\2YZ\7\6\2\2Z\25\3\2\2\2[^\5\32\16\2\\^\7 \2\2")
        buf.write("][\3\2\2\2]\\\3\2\2\2^\27\3\2\2\2_`\5\36\20\2`\31\3\2")
        buf.write("\2\2ab\7\35\2\2bc\5\34\17\2c\33\3\2\2\2de\7 \2\2e\35\3")
        buf.write("\2\2\2fg\7\36\2\2gh\7\3\2\2hi\7 \2\2ij\7\6\2\2j\37\3\2")
        buf.write("\2\2\b$\61=BO]")
        return buf.getvalue()


class DSLGrammarParser ( Parser ):

    grammarFileName = "DSLGrammar.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'('", "'AND'", "'OR'", "')'", "'NOT'", 
                     "'>'", "'<'", "'<='", "'>='", "'!='", "'=='", "'daily'", 
                     "'weekly'", "'monthly'", "'final'", "'sofar'", "'avg'", 
                     "'count'", "'max'", "'min'", "'sum'", "'val'", "'+'", 
                     "'-'", "'*'", "'/'", "'student.'", "'time'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "Number", "String", "ID", "WS" ]

    RULE_query = 0
    RULE_some_filter = 1
    RULE_logic = 2
    RULE_binary = 3
    RULE_comparable = 4
    RULE_number = 5
    RULE_modified_attributes = 6
    RULE_granularity_operator = 7
    RULE_aggr_op = 8
    RULE_arithmetic = 9
    RULE_string = 10
    RULE_time = 11
    RULE_student_attribute = 12
    RULE_attribute = 13
    RULE_time_lit = 14

    ruleNames =  [ "query", "some_filter", "logic", "binary", "comparable", 
                   "number", "modified_attributes", "granularity_operator", 
                   "aggr_op", "arithmetic", "string", "time", "student_attribute", 
                   "attribute", "time_lit" ]

    EOF = Token.EOF
    T__0=1
    T__1=2
    T__2=3
    T__3=4
    T__4=5
    T__5=6
    T__6=7
    T__7=8
    T__8=9
    T__9=10
    T__10=11
    T__11=12
    T__12=13
    T__13=14
    T__14=15
    T__15=16
    T__16=17
    T__17=18
    T__18=19
    T__19=20
    T__20=21
    T__21=22
    T__22=23
    T__23=24
    T__24=25
    T__25=26
    T__26=27
    T__27=28
    Number=29
    String=30
    ID=31
    WS=32

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.9.3")
        self._interp = ParserATNSimulator(self, self.atn, self.decisionsToDFA, self.sharedContextCache)
        self._predicates = None




    class QueryContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def some_filter(self):
            return self.getTypedRuleContext(DSLGrammarParser.Some_filterContext,0)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_query

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitQuery" ):
                return visitor.visitQuery(self)
            else:
                return visitor.visitChildren(self)




    def query(self):

        localctx = DSLGrammarParser.QueryContext(self, self._ctx, self.state)
        self.enterRule(localctx, 0, self.RULE_query)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 30
            self.some_filter()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class Some_filterContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def logic(self):
            return self.getTypedRuleContext(DSLGrammarParser.LogicContext,0)


        def binary(self):
            return self.getTypedRuleContext(DSLGrammarParser.BinaryContext,0)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_some_filter

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitSome_filter" ):
                return visitor.visitSome_filter(self)
            else:
                return visitor.visitChildren(self)




    def some_filter(self):

        localctx = DSLGrammarParser.Some_filterContext(self, self._ctx, self.state)
        self.enterRule(localctx, 2, self.RULE_some_filter)
        try:
            self.state = 34
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,0,self._ctx)
            if la_ == 1:
                self.enterOuterAlt(localctx, 1)
                self.state = 32
                self.logic()
                pass

            elif la_ == 2:
                self.enterOuterAlt(localctx, 2)
                self.state = 33
                self.binary()
                pass


        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class LogicContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def some_filter(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(DSLGrammarParser.Some_filterContext)
            else:
                return self.getTypedRuleContext(DSLGrammarParser.Some_filterContext,i)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_logic

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitLogic" ):
                return visitor.visitLogic(self)
            else:
                return visitor.visitChildren(self)




    def logic(self):

        localctx = DSLGrammarParser.LogicContext(self, self._ctx, self.state)
        self.enterRule(localctx, 4, self.RULE_logic)
        self._la = 0 # Token type
        try:
            self.state = 47
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,1,self._ctx)
            if la_ == 1:
                self.enterOuterAlt(localctx, 1)
                self.state = 36
                self.match(DSLGrammarParser.T__0)
                self.state = 37
                self.some_filter()
                self.state = 38
                _la = self._input.LA(1)
                if not(_la==DSLGrammarParser.T__1 or _la==DSLGrammarParser.T__2):
                    self._errHandler.recoverInline(self)
                else:
                    self._errHandler.reportMatch(self)
                    self.consume()
                self.state = 39
                self.some_filter()
                self.state = 40
                self.match(DSLGrammarParser.T__3)
                pass

            elif la_ == 2:
                self.enterOuterAlt(localctx, 2)
                self.state = 42
                self.match(DSLGrammarParser.T__0)
                self.state = 43
                self.match(DSLGrammarParser.T__4)
                self.state = 44
                self.some_filter()
                self.state = 45
                self.match(DSLGrammarParser.T__3)
                pass


        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class BinaryContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def comparable(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(DSLGrammarParser.ComparableContext)
            else:
                return self.getTypedRuleContext(DSLGrammarParser.ComparableContext,i)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_binary

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitBinary" ):
                return visitor.visitBinary(self)
            else:
                return visitor.visitChildren(self)




    def binary(self):

        localctx = DSLGrammarParser.BinaryContext(self, self._ctx, self.state)
        self.enterRule(localctx, 6, self.RULE_binary)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 49
            self.match(DSLGrammarParser.T__0)
            self.state = 50
            self.comparable()
            self.state = 51
            _la = self._input.LA(1)
            if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << DSLGrammarParser.T__5) | (1 << DSLGrammarParser.T__6) | (1 << DSLGrammarParser.T__7) | (1 << DSLGrammarParser.T__8) | (1 << DSLGrammarParser.T__9) | (1 << DSLGrammarParser.T__10))) != 0)):
                self._errHandler.recoverInline(self)
            else:
                self._errHandler.reportMatch(self)
                self.consume()
            self.state = 52
            self.comparable()
            self.state = 53
            self.match(DSLGrammarParser.T__3)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ComparableContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def number(self):
            return self.getTypedRuleContext(DSLGrammarParser.NumberContext,0)


        def time(self):
            return self.getTypedRuleContext(DSLGrammarParser.TimeContext,0)


        def string(self):
            return self.getTypedRuleContext(DSLGrammarParser.StringContext,0)


        def student_attribute(self):
            return self.getTypedRuleContext(DSLGrammarParser.Student_attributeContext,0)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_comparable

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitComparable" ):
                return visitor.visitComparable(self)
            else:
                return visitor.visitChildren(self)




    def comparable(self):

        localctx = DSLGrammarParser.ComparableContext(self, self._ctx, self.state)
        self.enterRule(localctx, 8, self.RULE_comparable)
        try:
            self.state = 59
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,2,self._ctx)
            if la_ == 1:
                self.enterOuterAlt(localctx, 1)
                self.state = 55
                self.number()
                pass

            elif la_ == 2:
                self.enterOuterAlt(localctx, 2)
                self.state = 56
                self.time()
                pass

            elif la_ == 3:
                self.enterOuterAlt(localctx, 3)
                self.state = 57
                self.string()
                pass

            elif la_ == 4:
                self.enterOuterAlt(localctx, 4)
                self.state = 58
                self.student_attribute()
                pass


        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class NumberContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def Number(self):
            return self.getToken(DSLGrammarParser.Number, 0)

        def arithmetic(self):
            return self.getTypedRuleContext(DSLGrammarParser.ArithmeticContext,0)


        def modified_attributes(self):
            return self.getTypedRuleContext(DSLGrammarParser.Modified_attributesContext,0)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_number

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitNumber" ):
                return visitor.visitNumber(self)
            else:
                return visitor.visitChildren(self)




    def number(self):

        localctx = DSLGrammarParser.NumberContext(self, self._ctx, self.state)
        self.enterRule(localctx, 10, self.RULE_number)
        try:
            self.state = 64
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [DSLGrammarParser.Number]:
                self.enterOuterAlt(localctx, 1)
                self.state = 61
                self.match(DSLGrammarParser.Number)
                pass
            elif token in [DSLGrammarParser.T__0]:
                self.enterOuterAlt(localctx, 2)
                self.state = 62
                self.arithmetic()
                pass
            elif token in [DSLGrammarParser.T__11, DSLGrammarParser.T__12, DSLGrammarParser.T__13, DSLGrammarParser.T__14, DSLGrammarParser.T__15, DSLGrammarParser.T__16, DSLGrammarParser.T__17, DSLGrammarParser.T__18, DSLGrammarParser.T__19, DSLGrammarParser.T__20, DSLGrammarParser.T__21, DSLGrammarParser.T__26]:
                self.enterOuterAlt(localctx, 3)
                self.state = 63
                self.modified_attributes()
                pass
            else:
                raise NoViableAltException(self)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class Modified_attributesContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def student_attribute(self):
            return self.getTypedRuleContext(DSLGrammarParser.Student_attributeContext,0)


        def granularity_operator(self):
            return self.getTypedRuleContext(DSLGrammarParser.Granularity_operatorContext,0)


        def modified_attributes(self):
            return self.getTypedRuleContext(DSLGrammarParser.Modified_attributesContext,0)


        def aggr_op(self):
            return self.getTypedRuleContext(DSLGrammarParser.Aggr_opContext,0)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_modified_attributes

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitModified_attributes" ):
                return visitor.visitModified_attributes(self)
            else:
                return visitor.visitChildren(self)




    def modified_attributes(self):

        localctx = DSLGrammarParser.Modified_attributesContext(self, self._ctx, self.state)
        self.enterRule(localctx, 12, self.RULE_modified_attributes)
        try:
            self.state = 77
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [DSLGrammarParser.T__26]:
                self.enterOuterAlt(localctx, 1)
                self.state = 66
                self.student_attribute()
                pass
            elif token in [DSLGrammarParser.T__11, DSLGrammarParser.T__12, DSLGrammarParser.T__13, DSLGrammarParser.T__14, DSLGrammarParser.T__15]:
                self.enterOuterAlt(localctx, 2)
                self.state = 67
                self.granularity_operator()
                self.state = 68
                self.match(DSLGrammarParser.T__0)
                self.state = 69
                self.modified_attributes()
                self.state = 70
                self.match(DSLGrammarParser.T__3)
                pass
            elif token in [DSLGrammarParser.T__16, DSLGrammarParser.T__17, DSLGrammarParser.T__18, DSLGrammarParser.T__19, DSLGrammarParser.T__20, DSLGrammarParser.T__21]:
                self.enterOuterAlt(localctx, 3)
                self.state = 72
                self.aggr_op()
                self.state = 73
                self.match(DSLGrammarParser.T__0)
                self.state = 74
                self.modified_attributes()
                self.state = 75
                self.match(DSLGrammarParser.T__3)
                pass
            else:
                raise NoViableAltException(self)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class Granularity_operatorContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_granularity_operator

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitGranularity_operator" ):
                return visitor.visitGranularity_operator(self)
            else:
                return visitor.visitChildren(self)




    def granularity_operator(self):

        localctx = DSLGrammarParser.Granularity_operatorContext(self, self._ctx, self.state)
        self.enterRule(localctx, 14, self.RULE_granularity_operator)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 79
            _la = self._input.LA(1)
            if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << DSLGrammarParser.T__11) | (1 << DSLGrammarParser.T__12) | (1 << DSLGrammarParser.T__13) | (1 << DSLGrammarParser.T__14) | (1 << DSLGrammarParser.T__15))) != 0)):
                self._errHandler.recoverInline(self)
            else:
                self._errHandler.reportMatch(self)
                self.consume()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class Aggr_opContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_aggr_op

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitAggr_op" ):
                return visitor.visitAggr_op(self)
            else:
                return visitor.visitChildren(self)




    def aggr_op(self):

        localctx = DSLGrammarParser.Aggr_opContext(self, self._ctx, self.state)
        self.enterRule(localctx, 16, self.RULE_aggr_op)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 81
            _la = self._input.LA(1)
            if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << DSLGrammarParser.T__16) | (1 << DSLGrammarParser.T__17) | (1 << DSLGrammarParser.T__18) | (1 << DSLGrammarParser.T__19) | (1 << DSLGrammarParser.T__20) | (1 << DSLGrammarParser.T__21))) != 0)):
                self._errHandler.recoverInline(self)
            else:
                self._errHandler.reportMatch(self)
                self.consume()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class ArithmeticContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def number(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(DSLGrammarParser.NumberContext)
            else:
                return self.getTypedRuleContext(DSLGrammarParser.NumberContext,i)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_arithmetic

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitArithmetic" ):
                return visitor.visitArithmetic(self)
            else:
                return visitor.visitChildren(self)




    def arithmetic(self):

        localctx = DSLGrammarParser.ArithmeticContext(self, self._ctx, self.state)
        self.enterRule(localctx, 18, self.RULE_arithmetic)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 83
            self.match(DSLGrammarParser.T__0)
            self.state = 84
            self.number()
            self.state = 85
            _la = self._input.LA(1)
            if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << DSLGrammarParser.T__22) | (1 << DSLGrammarParser.T__23) | (1 << DSLGrammarParser.T__24) | (1 << DSLGrammarParser.T__25))) != 0)):
                self._errHandler.recoverInline(self)
            else:
                self._errHandler.reportMatch(self)
                self.consume()
            self.state = 86
            self.number()
            self.state = 87
            self.match(DSLGrammarParser.T__3)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class StringContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def student_attribute(self):
            return self.getTypedRuleContext(DSLGrammarParser.Student_attributeContext,0)


        def String(self):
            return self.getToken(DSLGrammarParser.String, 0)

        def getRuleIndex(self):
            return DSLGrammarParser.RULE_string

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitString" ):
                return visitor.visitString(self)
            else:
                return visitor.visitChildren(self)




    def string(self):

        localctx = DSLGrammarParser.StringContext(self, self._ctx, self.state)
        self.enterRule(localctx, 20, self.RULE_string)
        try:
            self.state = 91
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [DSLGrammarParser.T__26]:
                self.enterOuterAlt(localctx, 1)
                self.state = 89
                self.student_attribute()
                pass
            elif token in [DSLGrammarParser.String]:
                self.enterOuterAlt(localctx, 2)
                self.state = 90
                self.match(DSLGrammarParser.String)
                pass
            else:
                raise NoViableAltException(self)

        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class TimeContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def time_lit(self):
            return self.getTypedRuleContext(DSLGrammarParser.Time_litContext,0)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_time

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitTime" ):
                return visitor.visitTime(self)
            else:
                return visitor.visitChildren(self)




    def time(self):

        localctx = DSLGrammarParser.TimeContext(self, self._ctx, self.state)
        self.enterRule(localctx, 22, self.RULE_time)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 93
            self.time_lit()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class Student_attributeContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def attribute(self):
            return self.getTypedRuleContext(DSLGrammarParser.AttributeContext,0)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_student_attribute

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitStudent_attribute" ):
                return visitor.visitStudent_attribute(self)
            else:
                return visitor.visitChildren(self)




    def student_attribute(self):

        localctx = DSLGrammarParser.Student_attributeContext(self, self._ctx, self.state)
        self.enterRule(localctx, 24, self.RULE_student_attribute)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 95
            self.match(DSLGrammarParser.T__26)
            self.state = 96
            self.attribute()
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class AttributeContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def String(self):
            return self.getToken(DSLGrammarParser.String, 0)

        def getRuleIndex(self):
            return DSLGrammarParser.RULE_attribute

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitAttribute" ):
                return visitor.visitAttribute(self)
            else:
                return visitor.visitChildren(self)




    def attribute(self):

        localctx = DSLGrammarParser.AttributeContext(self, self._ctx, self.state)
        self.enterRule(localctx, 26, self.RULE_attribute)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 98
            self.match(DSLGrammarParser.String)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class Time_litContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def String(self):
            return self.getToken(DSLGrammarParser.String, 0)

        def getRuleIndex(self):
            return DSLGrammarParser.RULE_time_lit

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitTime_lit" ):
                return visitor.visitTime_lit(self)
            else:
                return visitor.visitChildren(self)




    def time_lit(self):

        localctx = DSLGrammarParser.Time_litContext(self, self._ctx, self.state)
        self.enterRule(localctx, 28, self.RULE_time_lit)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 100
            self.match(DSLGrammarParser.T__27)
            self.state = 101
            self.match(DSLGrammarParser.T__0)
            self.state = 102
            self.match(DSLGrammarParser.String)
            self.state = 103
            self.match(DSLGrammarParser.T__3)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx





