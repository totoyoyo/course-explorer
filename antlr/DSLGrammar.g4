// Define something crazy
grammar DSLGrammar;

query : filter;
// filter : logic | binary | time_op | time_between;
filter : logic | binary | time;
logic : '('filter ('AND'|'OR') filter')' | '(''NOT' filter')';
binary : '('comparable ('>'|'<'|'<='|'>='|'!='|'==') comparable')';
comparable : number | student_attribute | time;
number : Number;
time : time_lit | student_attribute;
student_attribute : student'.'attribute;
student : String;
attribute : String;
time_lit : 'time' '(' String ')';

Number : [0-9]+;
String : [a-zA-Z0-9_\-]+;
ID : [a-z]+ ;             // match lower-case identifiers
WS : [ \t\r\n]+ -> skip ; // skip spaces, tabs, newlines