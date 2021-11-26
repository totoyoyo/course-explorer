// Define something crazy
grammar DSLGrammar;

query : filter;
filter : logic | binary | time_op;
logic : '('filter ('AND'|'OR') filter')' | '(''NOT' filter')';
time_op : ('BEFORE'|'AFTER') time | 'BETWEEN' time time;
binary : '('comparable ('>'|'<'|'<='|'>='|'!='|'==') comparable')';
comparable : number | time | string;
number : Number | arithmetic | granularity_result | student_attribute;
granularity_result : ('daily'|'weekly'|'monthly'|'final'|'sofar')
                     '('student_attribute')';
arithmetic : '('number ('+'|'-'|'*'|'/') number')';
string : student_attribute | String;
time : time_lit | student_attribute;
student_attribute : 'student.'attribute;
attribute : String;
time_lit : 'time' '(' String ')';

Number : [0-9]+;
String : [a-zA-Z0-9_\-]+;
ID : [a-z]+ ;             // match lower-case identifiers
WS : [ \t\r\n]+ -> skip ; // skip spaces, tabs, newlines