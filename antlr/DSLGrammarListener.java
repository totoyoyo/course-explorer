// Generated from .\DSLGrammar.g4 by ANTLR 4.9.3
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link DSLGrammarParser}.
 */
public interface DSLGrammarListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#query}.
	 * @param ctx the parse tree
	 */
	void enterQuery(DSLGrammarParser.QueryContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#query}.
	 * @param ctx the parse tree
	 */
	void exitQuery(DSLGrammarParser.QueryContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#filter}.
	 * @param ctx the parse tree
	 */
	void enterFilter(DSLGrammarParser.FilterContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#filter}.
	 * @param ctx the parse tree
	 */
	void exitFilter(DSLGrammarParser.FilterContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#logic}.
	 * @param ctx the parse tree
	 */
	void enterLogic(DSLGrammarParser.LogicContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#logic}.
	 * @param ctx the parse tree
	 */
	void exitLogic(DSLGrammarParser.LogicContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#time_op}.
	 * @param ctx the parse tree
	 */
	void enterTime_op(DSLGrammarParser.Time_opContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#time_op}.
	 * @param ctx the parse tree
	 */
	void exitTime_op(DSLGrammarParser.Time_opContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#binary}.
	 * @param ctx the parse tree
	 */
	void enterBinary(DSLGrammarParser.BinaryContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#binary}.
	 * @param ctx the parse tree
	 */
	void exitBinary(DSLGrammarParser.BinaryContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#comparable}.
	 * @param ctx the parse tree
	 */
	void enterComparable(DSLGrammarParser.ComparableContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#comparable}.
	 * @param ctx the parse tree
	 */
	void exitComparable(DSLGrammarParser.ComparableContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#number}.
	 * @param ctx the parse tree
	 */
	void enterNumber(DSLGrammarParser.NumberContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#number}.
	 * @param ctx the parse tree
	 */
	void exitNumber(DSLGrammarParser.NumberContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#granularity_result}.
	 * @param ctx the parse tree
	 */
	void enterGranularity_result(DSLGrammarParser.Granularity_resultContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#granularity_result}.
	 * @param ctx the parse tree
	 */
	void exitGranularity_result(DSLGrammarParser.Granularity_resultContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#arithmetic}.
	 * @param ctx the parse tree
	 */
	void enterArithmetic(DSLGrammarParser.ArithmeticContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#arithmetic}.
	 * @param ctx the parse tree
	 */
	void exitArithmetic(DSLGrammarParser.ArithmeticContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#string}.
	 * @param ctx the parse tree
	 */
	void enterString(DSLGrammarParser.StringContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#string}.
	 * @param ctx the parse tree
	 */
	void exitString(DSLGrammarParser.StringContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#time}.
	 * @param ctx the parse tree
	 */
	void enterTime(DSLGrammarParser.TimeContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#time}.
	 * @param ctx the parse tree
	 */
	void exitTime(DSLGrammarParser.TimeContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#student_attribute}.
	 * @param ctx the parse tree
	 */
	void enterStudent_attribute(DSLGrammarParser.Student_attributeContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#student_attribute}.
	 * @param ctx the parse tree
	 */
	void exitStudent_attribute(DSLGrammarParser.Student_attributeContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#attribute}.
	 * @param ctx the parse tree
	 */
	void enterAttribute(DSLGrammarParser.AttributeContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#attribute}.
	 * @param ctx the parse tree
	 */
	void exitAttribute(DSLGrammarParser.AttributeContext ctx);
	/**
	 * Enter a parse tree produced by {@link DSLGrammarParser#time_lit}.
	 * @param ctx the parse tree
	 */
	void enterTime_lit(DSLGrammarParser.Time_litContext ctx);
	/**
	 * Exit a parse tree produced by {@link DSLGrammarParser#time_lit}.
	 * @param ctx the parse tree
	 */
	void exitTime_lit(DSLGrammarParser.Time_litContext ctx);
}