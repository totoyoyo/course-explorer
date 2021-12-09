# Generated from C:/Users/ToToYoYo/PycharmProjects/course-explorer/antlr\DSLGrammar.g4 by ANTLR 4.9.2
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
        buf.write("\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\37")
        buf.write("i\4\2\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b")
        buf.write("\t\b\4\t\t\t\4\n\t\n\4\13\t\13\4\f\t\f\4\r\t\r\4\16\t")
        buf.write("\16\4\17\t\17\3\2\3\2\3\3\3\3\3\3\5\3$\n\3\3\4\3\4\3\4")
        buf.write("\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4\5\4\61\n\4\3\5\3\5\3")
        buf.write("\5\3\5\3\5\3\5\5\59\n\5\3\6\3\6\3\6\3\6\3\6\3\6\3\7\3")
        buf.write("\7\3\7\5\7D\n\7\3\b\3\b\3\b\3\b\5\bJ\n\b\3\t\3\t\3\t\3")
        buf.write("\t\3\t\3\n\3\n\3\n\3\n\3\n\3\n\3\13\3\13\5\13Y\n\13\3")
        buf.write("\f\3\f\5\f]\n\f\3\r\3\r\3\r\3\16\3\16\3\17\3\17\3\17\3")
        buf.write("\17\3\17\3\17\2\2\20\2\4\6\b\n\f\16\20\22\24\26\30\32")
        buf.write("\34\2\7\3\2\4\5\3\2\b\t\3\2\13\20\3\2\21\25\3\2\26\31")
        buf.write("\2e\2\36\3\2\2\2\4#\3\2\2\2\6\60\3\2\2\2\b8\3\2\2\2\n")
        buf.write(":\3\2\2\2\fC\3\2\2\2\16I\3\2\2\2\20K\3\2\2\2\22P\3\2\2")
        buf.write("\2\24X\3\2\2\2\26\\\3\2\2\2\30^\3\2\2\2\32a\3\2\2\2\34")
        buf.write("c\3\2\2\2\36\37\5\4\3\2\37\3\3\2\2\2 $\5\6\4\2!$\5\n\6")
        buf.write("\2\"$\5\b\5\2# \3\2\2\2#!\3\2\2\2#\"\3\2\2\2$\5\3\2\2")
        buf.write("\2%&\7\3\2\2&\'\5\4\3\2\'(\t\2\2\2()\5\4\3\2)*\7\6\2\2")
        buf.write("*\61\3\2\2\2+,\7\3\2\2,-\7\7\2\2-.\5\4\3\2./\7\6\2\2/")
        buf.write("\61\3\2\2\2\60%\3\2\2\2\60+\3\2\2\2\61\7\3\2\2\2\62\63")
        buf.write("\t\3\2\2\639\5\26\f\2\64\65\7\n\2\2\65\66\5\26\f\2\66")
        buf.write("\67\5\26\f\2\679\3\2\2\28\62\3\2\2\28\64\3\2\2\29\t\3")
        buf.write("\2\2\2:;\7\3\2\2;<\5\f\7\2<=\t\4\2\2=>\5\f\7\2>?\7\6\2")
        buf.write("\2?\13\3\2\2\2@D\5\16\b\2AD\5\26\f\2BD\5\24\13\2C@\3\2")
        buf.write("\2\2CA\3\2\2\2CB\3\2\2\2D\r\3\2\2\2EJ\7\34\2\2FJ\5\22")
        buf.write("\n\2GJ\5\20\t\2HJ\5\30\r\2IE\3\2\2\2IF\3\2\2\2IG\3\2\2")
        buf.write("\2IH\3\2\2\2J\17\3\2\2\2KL\t\5\2\2LM\7\3\2\2MN\5\30\r")
        buf.write("\2NO\7\6\2\2O\21\3\2\2\2PQ\7\3\2\2QR\5\16\b\2RS\t\6\2")
        buf.write("\2ST\5\16\b\2TU\7\6\2\2U\23\3\2\2\2VY\5\30\r\2WY\7\35")
        buf.write("\2\2XV\3\2\2\2XW\3\2\2\2Y\25\3\2\2\2Z]\5\34\17\2[]\5\30")
        buf.write("\r\2\\Z\3\2\2\2\\[\3\2\2\2]\27\3\2\2\2^_\7\32\2\2_`\5")
        buf.write("\32\16\2`\31\3\2\2\2ab\7\35\2\2b\33\3\2\2\2cd\7\33\2\2")
        buf.write("de\7\3\2\2ef\7\35\2\2fg\7\6\2\2g\35\3\2\2\2\t#\608CIX")
        buf.write("\\")
        return buf.getvalue()


class DSLGrammarParser ( Parser ):

    grammarFileName = "DSLGrammar.g4"

    atn = ATNDeserializer().deserialize(serializedATN())

    decisionsToDFA = [ DFA(ds, i) for i, ds in enumerate(atn.decisionToState) ]

    sharedContextCache = PredictionContextCache()

    literalNames = [ "<INVALID>", "'('", "'AND'", "'OR'", "')'", "'NOT'", 
                     "'BEFORE'", "'AFTER'", "'BETWEEN'", "'>'", "'<'", "'<='", 
                     "'>='", "'!='", "'=='", "'daily'", "'weekly'", "'monthly'", 
                     "'final'", "'sofar'", "'+'", "'-'", "'*'", "'/'", "'student.'", 
                     "'time'" ]

    symbolicNames = [ "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "<INVALID>", "<INVALID>", 
                      "<INVALID>", "<INVALID>", "Number", "String", "ID", 
                      "WS" ]

    RULE_query = 0
    RULE_some_filter = 1
    RULE_logic = 2
    RULE_time_op = 3
    RULE_binary = 4
    RULE_comparable = 5
    RULE_number = 6
    RULE_granularity_result = 7
    RULE_arithmetic = 8
    RULE_string = 9
    RULE_time = 10
    RULE_student_attribute = 11
    RULE_attribute = 12
    RULE_time_lit = 13

    ruleNames =  [ "query", "some_filter", "logic", "time_op", "binary", 
                   "comparable", "number", "granularity_result", "arithmetic", 
                   "string", "time", "student_attribute", "attribute", "time_lit" ]

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
    Number=26
    String=27
    ID=28
    WS=29

    def __init__(self, input:TokenStream, output:TextIO = sys.stdout):
        super().__init__(input, output)
        self.checkVersion("4.9.2")
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
            self.state = 28
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


        def time_op(self):
            return self.getTypedRuleContext(DSLGrammarParser.Time_opContext,0)


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
            self.state = 33
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,0,self._ctx)
            if la_ == 1:
                self.enterOuterAlt(localctx, 1)
                self.state = 30
                self.logic()
                pass

            elif la_ == 2:
                self.enterOuterAlt(localctx, 2)
                self.state = 31
                self.binary()
                pass

            elif la_ == 3:
                self.enterOuterAlt(localctx, 3)
                self.state = 32
                self.time_op()
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
            self.state = 46
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,1,self._ctx)
            if la_ == 1:
                self.enterOuterAlt(localctx, 1)
                self.state = 35
                self.match(DSLGrammarParser.T__0)
                self.state = 36
                self.some_filter()
                self.state = 37
                _la = self._input.LA(1)
                if not(_la==DSLGrammarParser.T__1 or _la==DSLGrammarParser.T__2):
                    self._errHandler.recoverInline(self)
                else:
                    self._errHandler.reportMatch(self)
                    self.consume()
                self.state = 38
                self.some_filter()
                self.state = 39
                self.match(DSLGrammarParser.T__3)
                pass

            elif la_ == 2:
                self.enterOuterAlt(localctx, 2)
                self.state = 41
                self.match(DSLGrammarParser.T__0)
                self.state = 42
                self.match(DSLGrammarParser.T__4)
                self.state = 43
                self.some_filter()
                self.state = 44
                self.match(DSLGrammarParser.T__3)
                pass


        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx


    class Time_opContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def time(self, i:int=None):
            if i is None:
                return self.getTypedRuleContexts(DSLGrammarParser.TimeContext)
            else:
                return self.getTypedRuleContext(DSLGrammarParser.TimeContext,i)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_time_op

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitTime_op" ):
                return visitor.visitTime_op(self)
            else:
                return visitor.visitChildren(self)




    def time_op(self):

        localctx = DSLGrammarParser.Time_opContext(self, self._ctx, self.state)
        self.enterRule(localctx, 6, self.RULE_time_op)
        self._la = 0 # Token type
        try:
            self.state = 54
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [DSLGrammarParser.T__5, DSLGrammarParser.T__6]:
                self.enterOuterAlt(localctx, 1)
                self.state = 48
                _la = self._input.LA(1)
                if not(_la==DSLGrammarParser.T__5 or _la==DSLGrammarParser.T__6):
                    self._errHandler.recoverInline(self)
                else:
                    self._errHandler.reportMatch(self)
                    self.consume()
                self.state = 49
                self.time()
                pass
            elif token in [DSLGrammarParser.T__7]:
                self.enterOuterAlt(localctx, 2)
                self.state = 50
                self.match(DSLGrammarParser.T__7)
                self.state = 51
                self.time()
                self.state = 52
                self.time()
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
        self.enterRule(localctx, 8, self.RULE_binary)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 56
            self.match(DSLGrammarParser.T__0)
            self.state = 57
            self.comparable()
            self.state = 58
            _la = self._input.LA(1)
            if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << DSLGrammarParser.T__8) | (1 << DSLGrammarParser.T__9) | (1 << DSLGrammarParser.T__10) | (1 << DSLGrammarParser.T__11) | (1 << DSLGrammarParser.T__12) | (1 << DSLGrammarParser.T__13))) != 0)):
                self._errHandler.recoverInline(self)
            else:
                self._errHandler.reportMatch(self)
                self.consume()
            self.state = 59
            self.comparable()
            self.state = 60
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


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_comparable

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitComparable" ):
                return visitor.visitComparable(self)
            else:
                return visitor.visitChildren(self)




    def comparable(self):

        localctx = DSLGrammarParser.ComparableContext(self, self._ctx, self.state)
        self.enterRule(localctx, 10, self.RULE_comparable)
        try:
            self.state = 65
            self._errHandler.sync(self)
            la_ = self._interp.adaptivePredict(self._input,3,self._ctx)
            if la_ == 1:
                self.enterOuterAlt(localctx, 1)
                self.state = 62
                self.number()
                pass

            elif la_ == 2:
                self.enterOuterAlt(localctx, 2)
                self.state = 63
                self.time()
                pass

            elif la_ == 3:
                self.enterOuterAlt(localctx, 3)
                self.state = 64
                self.string()
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


        def granularity_result(self):
            return self.getTypedRuleContext(DSLGrammarParser.Granularity_resultContext,0)


        def student_attribute(self):
            return self.getTypedRuleContext(DSLGrammarParser.Student_attributeContext,0)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_number

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitNumber" ):
                return visitor.visitNumber(self)
            else:
                return visitor.visitChildren(self)




    def number(self):

        localctx = DSLGrammarParser.NumberContext(self, self._ctx, self.state)
        self.enterRule(localctx, 12, self.RULE_number)
        try:
            self.state = 71
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [DSLGrammarParser.Number]:
                self.enterOuterAlt(localctx, 1)
                self.state = 67
                self.match(DSLGrammarParser.Number)
                pass
            elif token in [DSLGrammarParser.T__0]:
                self.enterOuterAlt(localctx, 2)
                self.state = 68
                self.arithmetic()
                pass
            elif token in [DSLGrammarParser.T__14, DSLGrammarParser.T__15, DSLGrammarParser.T__16, DSLGrammarParser.T__17, DSLGrammarParser.T__18]:
                self.enterOuterAlt(localctx, 3)
                self.state = 69
                self.granularity_result()
                pass
            elif token in [DSLGrammarParser.T__23]:
                self.enterOuterAlt(localctx, 4)
                self.state = 70
                self.student_attribute()
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


    class Granularity_resultContext(ParserRuleContext):
        __slots__ = 'parser'

        def __init__(self, parser, parent:ParserRuleContext=None, invokingState:int=-1):
            super().__init__(parent, invokingState)
            self.parser = parser

        def student_attribute(self):
            return self.getTypedRuleContext(DSLGrammarParser.Student_attributeContext,0)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_granularity_result

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitGranularity_result" ):
                return visitor.visitGranularity_result(self)
            else:
                return visitor.visitChildren(self)




    def granularity_result(self):

        localctx = DSLGrammarParser.Granularity_resultContext(self, self._ctx, self.state)
        self.enterRule(localctx, 14, self.RULE_granularity_result)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 73
            _la = self._input.LA(1)
            if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << DSLGrammarParser.T__14) | (1 << DSLGrammarParser.T__15) | (1 << DSLGrammarParser.T__16) | (1 << DSLGrammarParser.T__17) | (1 << DSLGrammarParser.T__18))) != 0)):
                self._errHandler.recoverInline(self)
            else:
                self._errHandler.reportMatch(self)
                self.consume()
            self.state = 74
            self.match(DSLGrammarParser.T__0)
            self.state = 75
            self.student_attribute()
            self.state = 76
            self.match(DSLGrammarParser.T__3)
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
        self.enterRule(localctx, 16, self.RULE_arithmetic)
        self._la = 0 # Token type
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 78
            self.match(DSLGrammarParser.T__0)
            self.state = 79
            self.number()
            self.state = 80
            _la = self._input.LA(1)
            if not((((_la) & ~0x3f) == 0 and ((1 << _la) & ((1 << DSLGrammarParser.T__19) | (1 << DSLGrammarParser.T__20) | (1 << DSLGrammarParser.T__21) | (1 << DSLGrammarParser.T__22))) != 0)):
                self._errHandler.recoverInline(self)
            else:
                self._errHandler.reportMatch(self)
                self.consume()
            self.state = 81
            self.number()
            self.state = 82
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
        self.enterRule(localctx, 18, self.RULE_string)
        try:
            self.state = 86
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [DSLGrammarParser.T__23]:
                self.enterOuterAlt(localctx, 1)
                self.state = 84
                self.student_attribute()
                pass
            elif token in [DSLGrammarParser.String]:
                self.enterOuterAlt(localctx, 2)
                self.state = 85
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


        def student_attribute(self):
            return self.getTypedRuleContext(DSLGrammarParser.Student_attributeContext,0)


        def getRuleIndex(self):
            return DSLGrammarParser.RULE_time

        def accept(self, visitor:ParseTreeVisitor):
            if hasattr( visitor, "visitTime" ):
                return visitor.visitTime(self)
            else:
                return visitor.visitChildren(self)




    def time(self):

        localctx = DSLGrammarParser.TimeContext(self, self._ctx, self.state)
        self.enterRule(localctx, 20, self.RULE_time)
        try:
            self.state = 90
            self._errHandler.sync(self)
            token = self._input.LA(1)
            if token in [DSLGrammarParser.T__24]:
                self.enterOuterAlt(localctx, 1)
                self.state = 88
                self.time_lit()
                pass
            elif token in [DSLGrammarParser.T__23]:
                self.enterOuterAlt(localctx, 2)
                self.state = 89
                self.student_attribute()
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
        self.enterRule(localctx, 22, self.RULE_student_attribute)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 92
            self.match(DSLGrammarParser.T__23)
            self.state = 93
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
        self.enterRule(localctx, 24, self.RULE_attribute)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 95
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
        self.enterRule(localctx, 26, self.RULE_time_lit)
        try:
            self.enterOuterAlt(localctx, 1)
            self.state = 97
            self.match(DSLGrammarParser.T__24)
            self.state = 98
            self.match(DSLGrammarParser.T__0)
            self.state = 99
            self.match(DSLGrammarParser.String)
            self.state = 100
            self.match(DSLGrammarParser.T__3)
        except RecognitionException as re:
            localctx.exception = re
            self._errHandler.reportError(self, re)
            self._errHandler.recover(self, re)
        finally:
            self.exitRule()
        return localctx





