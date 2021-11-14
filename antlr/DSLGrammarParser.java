// Generated from .\DSLGrammar.g4 by ANTLR 4.9.3
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class DSLGrammarParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.9.3", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, T__11=12, T__12=13, Number=14, String=15, ID=16, WS=17;
	public static final int
		RULE_query = 0, RULE_filter = 1, RULE_logic = 2, RULE_binary = 3, RULE_comparable = 4, 
		RULE_number = 5, RULE_time = 6, RULE_student_attribute = 7, RULE_student = 8, 
		RULE_attribute = 9, RULE_time_lit = 10;
	private static String[] makeRuleNames() {
		return new String[] {
			"query", "filter", "logic", "binary", "comparable", "number", "time", 
			"student_attribute", "student", "attribute", "time_lit"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'('", "'AND'", "'OR'", "')'", "'NOT'", "'>'", "'<'", "'<='", "'>='", 
			"'!='", "'=='", "'.'", "'time'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, null, null, null, null, null, null, null, null, null, null, null, 
			null, null, "Number", "String", "ID", "WS"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "DSLGrammar.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public DSLGrammarParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	public static class QueryContext extends ParserRuleContext {
		public FilterContext filter() {
			return getRuleContext(FilterContext.class,0);
		}
		public QueryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_query; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterQuery(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitQuery(this);
		}
	}

	public final QueryContext query() throws RecognitionException {
		QueryContext _localctx = new QueryContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_query);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(22);
			filter();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FilterContext extends ParserRuleContext {
		public LogicContext logic() {
			return getRuleContext(LogicContext.class,0);
		}
		public BinaryContext binary() {
			return getRuleContext(BinaryContext.class,0);
		}
		public TimeContext time() {
			return getRuleContext(TimeContext.class,0);
		}
		public FilterContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_filter; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterFilter(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitFilter(this);
		}
	}

	public final FilterContext filter() throws RecognitionException {
		FilterContext _localctx = new FilterContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_filter);
		try {
			setState(27);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,0,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(24);
				logic();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(25);
				binary();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(26);
				time();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class LogicContext extends ParserRuleContext {
		public List<FilterContext> filter() {
			return getRuleContexts(FilterContext.class);
		}
		public FilterContext filter(int i) {
			return getRuleContext(FilterContext.class,i);
		}
		public LogicContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_logic; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterLogic(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitLogic(this);
		}
	}

	public final LogicContext logic() throws RecognitionException {
		LogicContext _localctx = new LogicContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_logic);
		int _la;
		try {
			setState(40);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,1,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(29);
				match(T__0);
				setState(30);
				filter();
				setState(31);
				_la = _input.LA(1);
				if ( !(_la==T__1 || _la==T__2) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(32);
				filter();
				setState(33);
				match(T__3);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(35);
				match(T__0);
				setState(36);
				match(T__4);
				setState(37);
				filter();
				setState(38);
				match(T__3);
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class BinaryContext extends ParserRuleContext {
		public List<ComparableContext> comparable() {
			return getRuleContexts(ComparableContext.class);
		}
		public ComparableContext comparable(int i) {
			return getRuleContext(ComparableContext.class,i);
		}
		public BinaryContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_binary; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterBinary(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitBinary(this);
		}
	}

	public final BinaryContext binary() throws RecognitionException {
		BinaryContext _localctx = new BinaryContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_binary);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(42);
			match(T__0);
			setState(43);
			comparable();
			setState(44);
			_la = _input.LA(1);
			if ( !((((_la) & ~0x3f) == 0 && ((1L << _la) & ((1L << T__5) | (1L << T__6) | (1L << T__7) | (1L << T__8) | (1L << T__9) | (1L << T__10))) != 0)) ) {
			_errHandler.recoverInline(this);
			}
			else {
				if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
				_errHandler.reportMatch(this);
				consume();
			}
			setState(45);
			comparable();
			setState(46);
			match(T__3);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ComparableContext extends ParserRuleContext {
		public NumberContext number() {
			return getRuleContext(NumberContext.class,0);
		}
		public Student_attributeContext student_attribute() {
			return getRuleContext(Student_attributeContext.class,0);
		}
		public TimeContext time() {
			return getRuleContext(TimeContext.class,0);
		}
		public ComparableContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_comparable; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterComparable(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitComparable(this);
		}
	}

	public final ComparableContext comparable() throws RecognitionException {
		ComparableContext _localctx = new ComparableContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_comparable);
		try {
			setState(51);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(48);
				number();
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(49);
				student_attribute();
				}
				break;
			case 3:
				enterOuterAlt(_localctx, 3);
				{
				setState(50);
				time();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class NumberContext extends ParserRuleContext {
		public TerminalNode Number() { return getToken(DSLGrammarParser.Number, 0); }
		public NumberContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_number; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterNumber(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitNumber(this);
		}
	}

	public final NumberContext number() throws RecognitionException {
		NumberContext _localctx = new NumberContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_number);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(53);
			match(Number);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TimeContext extends ParserRuleContext {
		public Time_litContext time_lit() {
			return getRuleContext(Time_litContext.class,0);
		}
		public Student_attributeContext student_attribute() {
			return getRuleContext(Student_attributeContext.class,0);
		}
		public TimeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_time; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterTime(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitTime(this);
		}
	}

	public final TimeContext time() throws RecognitionException {
		TimeContext _localctx = new TimeContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_time);
		try {
			setState(57);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case T__12:
				enterOuterAlt(_localctx, 1);
				{
				setState(55);
				time_lit();
				}
				break;
			case String:
				enterOuterAlt(_localctx, 2);
				{
				setState(56);
				student_attribute();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Student_attributeContext extends ParserRuleContext {
		public StudentContext student() {
			return getRuleContext(StudentContext.class,0);
		}
		public AttributeContext attribute() {
			return getRuleContext(AttributeContext.class,0);
		}
		public Student_attributeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_student_attribute; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterStudent_attribute(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitStudent_attribute(this);
		}
	}

	public final Student_attributeContext student_attribute() throws RecognitionException {
		Student_attributeContext _localctx = new Student_attributeContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_student_attribute);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(59);
			student();
			setState(60);
			match(T__11);
			setState(61);
			attribute();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StudentContext extends ParserRuleContext {
		public TerminalNode String() { return getToken(DSLGrammarParser.String, 0); }
		public StudentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_student; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterStudent(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitStudent(this);
		}
	}

	public final StudentContext student() throws RecognitionException {
		StudentContext _localctx = new StudentContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_student);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(63);
			match(String);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AttributeContext extends ParserRuleContext {
		public TerminalNode String() { return getToken(DSLGrammarParser.String, 0); }
		public AttributeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_attribute; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterAttribute(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitAttribute(this);
		}
	}

	public final AttributeContext attribute() throws RecognitionException {
		AttributeContext _localctx = new AttributeContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_attribute);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(65);
			match(String);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class Time_litContext extends ParserRuleContext {
		public TerminalNode String() { return getToken(DSLGrammarParser.String, 0); }
		public Time_litContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_time_lit; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).enterTime_lit(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DSLGrammarListener ) ((DSLGrammarListener)listener).exitTime_lit(this);
		}
	}

	public final Time_litContext time_lit() throws RecognitionException {
		Time_litContext _localctx = new Time_litContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_time_lit);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(67);
			match(T__12);
			setState(68);
			match(T__0);
			setState(69);
			match(String);
			setState(70);
			match(T__3);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\23K\4\2\t\2\4\3\t"+
		"\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13\t\13\4"+
		"\f\t\f\3\2\3\2\3\3\3\3\3\3\5\3\36\n\3\3\4\3\4\3\4\3\4\3\4\3\4\3\4\3\4"+
		"\3\4\3\4\3\4\5\4+\n\4\3\5\3\5\3\5\3\5\3\5\3\5\3\6\3\6\3\6\5\6\66\n\6\3"+
		"\7\3\7\3\b\3\b\5\b<\n\b\3\t\3\t\3\t\3\t\3\n\3\n\3\13\3\13\3\f\3\f\3\f"+
		"\3\f\3\f\3\f\2\2\r\2\4\6\b\n\f\16\20\22\24\26\2\4\3\2\4\5\3\2\b\r\2E\2"+
		"\30\3\2\2\2\4\35\3\2\2\2\6*\3\2\2\2\b,\3\2\2\2\n\65\3\2\2\2\f\67\3\2\2"+
		"\2\16;\3\2\2\2\20=\3\2\2\2\22A\3\2\2\2\24C\3\2\2\2\26E\3\2\2\2\30\31\5"+
		"\4\3\2\31\3\3\2\2\2\32\36\5\6\4\2\33\36\5\b\5\2\34\36\5\16\b\2\35\32\3"+
		"\2\2\2\35\33\3\2\2\2\35\34\3\2\2\2\36\5\3\2\2\2\37 \7\3\2\2 !\5\4\3\2"+
		"!\"\t\2\2\2\"#\5\4\3\2#$\7\6\2\2$+\3\2\2\2%&\7\3\2\2&\'\7\7\2\2\'(\5\4"+
		"\3\2()\7\6\2\2)+\3\2\2\2*\37\3\2\2\2*%\3\2\2\2+\7\3\2\2\2,-\7\3\2\2-."+
		"\5\n\6\2./\t\3\2\2/\60\5\n\6\2\60\61\7\6\2\2\61\t\3\2\2\2\62\66\5\f\7"+
		"\2\63\66\5\20\t\2\64\66\5\16\b\2\65\62\3\2\2\2\65\63\3\2\2\2\65\64\3\2"+
		"\2\2\66\13\3\2\2\2\678\7\20\2\28\r\3\2\2\29<\5\26\f\2:<\5\20\t\2;9\3\2"+
		"\2\2;:\3\2\2\2<\17\3\2\2\2=>\5\22\n\2>?\7\16\2\2?@\5\24\13\2@\21\3\2\2"+
		"\2AB\7\21\2\2B\23\3\2\2\2CD\7\21\2\2D\25\3\2\2\2EF\7\17\2\2FG\7\3\2\2"+
		"GH\7\21\2\2HI\7\6\2\2I\27\3\2\2\2\6\35*\65;";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}