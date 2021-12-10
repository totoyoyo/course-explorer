// Define something crazy
grammar DSLGrammar;

query : some_filter;
some_filter : logic | binary;
logic : '('some_filter ('AND'|'OR') some_filter')'
      | '(''NOT' some_filter')';
binary : '('comparable ('>'|'<'|'<='|'>='|'!='|'==') comparable')';
comparable : number | time | string | student_attribute;
number : Number | arithmetic | modified_attributes;
modified_attributes : student_attribute
        | granularity_operator'('modified_attributes')'
        | aggr_op'('modified_attributes')' ;
granularity_operator : 'daily'|'weekly'|'monthly'|'final'|'sofar';
aggr_op : 'avg' | 'count' | 'max' | 'min' | 'sum' | 'val' ;
arithmetic : '('number ('+'|'-'|'*'|'/') number')';
string : student_attribute | String;
time : time_lit ;
student_attribute : 'student.'attribute;
attribute : String;
time_lit : 'time' '(' String ')';

Number : DIGIT+ '.' DIGIT*
       | '.' DIGIT+
       | DIGIT+
       ;
String : [a-zA-Z0-9_\-]+;

fragment DIGIT : [0-9];

ID : [a-z]+ ;             // match lower-case identifiers
WS : [ \t\r\n]+ -> skip ; // skip spaces, tabs, newlines