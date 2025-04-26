import { Token } from "./";

export const tokens = {
  LPAREN: "LPAREN", //  (
  RPAREN: "RPAREN", //  )
  LCURLY: "LCURLY", //  {
  RCURLY: "RCURLY", //  }
  LSQUAR: "LSQUAR", //  [
  RSQUAR: "RSQUAR", //  ]
  COMMA: "COMMA", //  ,
  DOT: "DOT", //  .
  PLUS: "PLUS", //  +
  MINUS: "MINUS", //  -
  STAR: "STAR", //  *
  SLASH: "SLASH", //  /
  CARET: "CARET", //  ^
  MOD: "MOD", //  %
  COLON: "COLON", //  :
  SEMICOLON: "SEMICOLON", //  ;
  QUESTION: "QUESTION", //  ?
  NOT: "NOT", //  ~
  GT: "GT", //  >
  LT: "LT", //  <

  // Two-char tokens
  GE: "GE", //  >=
  LE: "LE", //  <=
  NE: "NE", //  ~=
  EQ: "EQ", //  ==
  ASSIGN: "ASSIGN", //  :=
  GTGT: "GTGT", //  >>
  LTLT: "LTLT", //  <<

  // Literal:
  IDENTIFIER: "IDENTIFIER",
  STRING: "STRING",
  INTEGER: "INTEGER",
  FLOAT: "FLOAT",

  // Keyword
  IF: "IF",
  THEN: "THEN",
  ELSE: "ELSE",
  TRUE: "TRUE",
  FALSE: "FALSE",
  AND: "AND",
  OR: "OR",
  WHILE: "WHILE",
  DO: "DO",
  FOR: "FOR",
  FUNC: "FUNC",
  NULL: "NULL",
  END: "END",
  PRINT: "PRINT",
  PRINTLN: "PRINTLN",
  RET: "RET",

  // EOF
  EOF: "EOF",

  // Illegal
  ILLEGAL: "ILLEGAL",

  // Empty
  EMPTY: "EMPTY",
} as const;

export const charCodes = {
  LT: 60,
  GT: 62,
  NOT: 126,
  QUESTION: 63,
  SEMICOLON: 59,
  COLON: 58,
  MOD: 37,
  CARET: 94,
  SLASH: 47,
  STAR: 42,
  MINUS: 45,
  PLUS: 43,
  DOT: 46,
  COMMA: 44,
  RSQUAR: 93,
  LSQUAR: 91,
  RCURLY: 125,
  LCURLY: 123,
  RPAREN: 41,
  LPAREN: 40,
  EQ: 61,

  LF: 10,
  CR: 13,
  TAB: 9,
  SPACE: 32,
  HASH: 35,

  ZERO: 48,
  NINE: 57,

  SINGLE_QUOTE: 39,
  DOUBLE_QUOTE: 34,

  a: 97,
  A: 65,
  z: 122,
  Z: 90,
  UNDERSCORE: 95,
} as const;

const keywords: Record<string, TokenType> = {
  if: "IF",
  then: "THEN",
  else: "ELSE",
  true: "TRUE",
  false: "FALSE",
  and: "AND",
  or: "OR",
  while: "WHILE",
  do: "DO",
  for: "FOR",
  func: "FUNC",
  null: "NULL",
  end: "END",
  print: "PRINT",
  println: "PRINTLN",
  ret: "RET",
};

export function lookupIdentifier(identifier: string): TokenType {
  return keywords[identifier] ?? tokens.IDENTIFIER;
}

export type TokenType = keyof typeof tokens;
