import { Token } from "../token";
import { charCodes, tokens } from "../token/tokens";

export class Lexer {
  private tokens: Token[] = [];
  private position = -1;
  private readPosition = 0;
  private ch = 0;
  private line = 1;

  constructor(private source: Uint8Array) {
    this.advance();
  }

  public tokenize(): Token[] {
    let token = this.nextToken(this.ch);

    while (token.type !== tokens.EOF) {
      this.tokens.push(token);

      token = this.nextToken(this.ch);
    }

    return this.tokens;
  }

  private nextToken(ch: number): Token {
    let token: Token;

    switch (ch) {
      case 0:
        token = new Token(tokens.EOF, "");
        break;
      case charCodes.LT:
        token = new Token(tokens.LT, "<");
        break;
      case charCodes.GT:
        token = new Token(tokens.GT, ">");
        break;
      case charCodes.NOT:
        token = new Token(tokens.NOT, "~");
        break;
      case charCodes.QUESTION:
        token = new Token(tokens.QUESTION, "?");
        break;
      case charCodes.SEMICOLON:
        token = new Token(tokens.SEMICOLON, ";");
        break;
      case charCodes.COLON:
        token = new Token(tokens.COLON, ":");
        break;
      case charCodes.MOD:
        token = new Token(tokens.MOD, "%");
        break;
      case charCodes.CARET:
        token = new Token(tokens.CARET, "^");
        break;
      case charCodes.SLASH:
        token = new Token(tokens.SLASH, "/");
        break;
      case charCodes.STAR:
        token = new Token(tokens.STAR, "*");
        break;
      case charCodes.MINUS:
        token = new Token(tokens.MINUS, "-");
        break;
      case charCodes.PLUS:
        token = new Token(tokens.PLUS, "+");
        break;
      case charCodes.DOT:
        token = new Token(tokens.DOT, ".");
        break;
      case charCodes.COMMA:
        token = new Token(tokens.COMMA, ",");
        break;
      case charCodes.RSQUAR:
        token = new Token(tokens.RSQUAR, "]");
        break;
      case charCodes.LSQUAR:
        token = new Token(tokens.LSQUAR, "[");
        break;
      case charCodes.RCURLY:
        token = new Token(tokens.RCURLY, "}");
        break;
      case charCodes.LCURLY:
        token = new Token(tokens.LCURLY, "{");
        break;
      case charCodes.RPAREN:
        token = new Token(tokens.RPAREN, ")");
        break;
      case charCodes.LPAREN:
        token = new Token(tokens.LPAREN, "(");
        break;
      case charCodes.EQ:
        token = new Token(tokens.EQ, "=");
        break;
      default:
        token = new Token(tokens.AND, "&&");
    }

    this.advance();

    return token;
  }

  private advance() {
    if (this.readPosition >= this.source.length) {
      this.ch = 0;
    } else {
      this.ch = this.source[this.readPosition] ?? 0;
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }
}
