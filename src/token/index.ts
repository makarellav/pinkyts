import type { TokenType } from "./tokens";

export class Token {
  constructor(
    public readonly type: TokenType,
    public readonly lexeme: string,
  ) {}

  public toString() {
    return `Token(${this.type}, ${this.lexeme})`;
  }
}
