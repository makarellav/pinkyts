import { Token } from "../token";
import { charCodes, lookupIdentifier, tokens } from "../token/tokens";

const EOF = 0;

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
    let token = this.nextToken();

    while (token.type !== tokens.EOF) {
      this.tokens.push(token);

      token = this.nextToken();
    }

    return this.tokens;
  }

  private nextToken(): Token {
    let token: Token;

    if (this.ch === charCodes.HASH) {
      this.consumeComment();
    }

    this.consumeWhitespace();

    switch (this.ch) {
      case EOF:
        token = new Token(tokens.EOF, "");
        break;
      case charCodes.LT:
        if (this.peek() === charCodes.EQ) {
          token = new Token(tokens.LE, "<=");

          this.advance();
        } else {
          token = new Token(tokens.LT, "<");
        }

        break;
      case charCodes.GT:
        if (this.peek() === charCodes.EQ) {
          token = new Token(tokens.GE, ">=");

          this.advance();
        } else {
          token = new Token(tokens.GT, ">");
        }
        break;
      case charCodes.NOT:
        if (this.peek() === charCodes.EQ) {
          token = new Token(tokens.NE, "~=");

          this.advance();
        } else {
          token = new Token(tokens.NOT, "~");
        }

        break;
      case charCodes.QUESTION:
        token = new Token(tokens.QUESTION, "?");
        break;
      case charCodes.SEMICOLON:
        token = new Token(tokens.SEMICOLON, ";");
        break;
      case charCodes.COLON:
        if (this.peek() === charCodes.EQ) {
          token = new Token(tokens.ASSIGN, ":=");

          this.advance();
        } else {
          token = new Token(tokens.COLON, ":");
        }

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
        if (this.peek() === charCodes.EQ) {
          token = new Token(tokens.EQ, "==");

          this.advance();
        } else {
          token = new Token(tokens.EQ, "=");
        }

        break;
      default:
        if (this.isDigit(this.ch)) {
          token = this.readNumber();

          return token;
        } else if (this.isString(this.ch)) {
          token = this.readString(this.ch);

          return token;
        } else if (this.isAlpha(this.ch)) {
          token = this.readIdentifier();

          return token;
        } else {
          token = new Token(tokens.ILLEGAL, "");
        }
    }

    this.advance();

    return token;
  }

  private readNumber(): Token {
    let token: Token;

    const integer = this.readInteger();

    const decoder = new TextDecoder();

    if (this.ch === charCodes.DOT && this.isDigit(this.peek() ?? 0)) {
      this.advance();

      const decimal = this.readInteger();

      token = new Token(
        tokens.FLOAT,
        `${decoder.decode(integer)}.${decoder.decode(decimal)}`,
      );
    } else {
      token = new Token(tokens.INTEGER, decoder.decode(integer));
    }

    return token;
  }

  private consumeWhitespace() {
    while (
      this.ch === charCodes.LF ||
      this.ch === charCodes.CR ||
      this.ch === charCodes.TAB ||
      this.ch === charCodes.SPACE
    ) {
      if (this.ch === charCodes.LF || this.ch === charCodes.CR) {
        this.line += 1;
      }

      this.advance();
    }
  }

  private consumeComment() {
    while (this.ch !== charCodes.LF && this.ch !== EOF) {
      this.advance();
    }
  }

  private peek(n: number = 0) {
    return this.readPosition + n >= this.source.length
      ? 0
      : this.source[this.readPosition + n];
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

  private readInteger(): Uint8Array {
    const position = this.position;

    while (this.isDigit(this.ch)) {
      this.advance();
    }

    return this.source.slice(position, this.position);
  }

  private readIdentifier(): Token {
    const rawIdentifier = this.readIdentifierRaw();
    const decoder = new TextDecoder();

    const identifier = decoder.decode(rawIdentifier);

    const tokenType = lookupIdentifier(identifier);

    return new Token(tokenType, identifier);
  }

  private readIdentifierRaw(): Uint8Array {
    const position = this.position;

    let isFirst = true;

    while (
      this.isAlpha(this.ch) ||
      this.ch === charCodes.UNDERSCORE ||
      (!isFirst && this.isDigit(this.ch))
    ) {
      this.advance();

      isFirst = false;
    }

    return this.source.slice(position, this.position);
  }

  private readString(quote: number): Token {
    const rawString = this.readStringRaw(quote);

    const decoder = new TextDecoder();

    return new Token(tokens.STRING, decoder.decode(rawString));
  }

  private readStringRaw(quote: number): Uint8Array {
    const position = this.position;

    this.advance();

    while (this.ch !== quote && this.ch !== EOF) {
      this.advance();
    }

    this.advance();

    return this.source.slice(position, this.position);
  }

  private isAlpha(ch: number) {
    return (
      (ch >= charCodes.a && ch <= charCodes.z) ||
      (ch >= charCodes.A && ch <= charCodes.Z) ||
      ch === charCodes.UNDERSCORE
    );
  }

  private isString(ch: number) {
    return ch === charCodes.DOUBLE_QUOTE || ch === charCodes.SINGLE_QUOTE;
  }

  private isDigit(ch: number) {
    return ch >= charCodes.ZERO && ch <= charCodes.NINE;
  }
}
