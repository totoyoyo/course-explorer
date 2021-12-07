# Some notes

To generate python files, run:

`antlr4 -Dlanguage=Python3 -no-listener -visitor DSLGrammar.g4`

Guide:
https://github.com/antlr/antlr4/blob/master/doc/getting-started.md

To go the GUI tree thingy, you need to run antlr4 with java, for java reasons. Code is below

```
antlr4 -Dlanguage=Java DSLGrammar.g4
javac *.java
grun DSLGrammar query -tree
(or something like)
grun DSLGrammar query -gui
(or something like)
grun DSLGrammar query -gui test_input.txt

```

This assumes you have antlr4, grun, and javac set up though....