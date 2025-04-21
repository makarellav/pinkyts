import { describe, expect, test } from "bun:test";
import { Lexer } from "../";
import { Token } from "../../token";
import { tokens } from "../../token/tokens";

describe.each([
  ["[", new Token(tokens.LSQUAR, "[")],
  ["]", new Token(tokens.RSQUAR, "]")],
  ["{", new Token(tokens.LCURLY, "{")],
  ["}", new Token(tokens.RCURLY, "}")],
  ["(", new Token(tokens.LPAREN, "(")],
  [")", new Token(tokens.RPAREN, ")")],
  ["+", new Token(tokens.PLUS, "+")],
  ["-", new Token(tokens.MINUS, "-")],
  ["*", new Token(tokens.STAR, "*")],
  [">", new Token(tokens.GT, ">")],
  ["<", new Token(tokens.LT, "<")],
  ["=", new Token(tokens.EQ, "=")],
  ["^", new Token(tokens.CARET, "^")],
])("should tokenize character %s correctly", (char, token) => {
  test(`${token}`, () => {
    const [got] = new Lexer(new TextEncoder().encode(char)).tokenize();

    expect(got).toBeDefined();

    expect(got!.lexeme).toBe(token.lexeme);
    expect(got!.type).toBe(token.type);
  });
});
