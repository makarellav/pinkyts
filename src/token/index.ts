import type { TokenType } from "./tokens";

export class Token {
  constructor(
    public readonly type: TokenType,
    public readonly lexeme: string,
  ) {}

  public toString() {
    return this.pp();
  }

  private pp() {
    return `Token(${this.type}, ${this.lexeme})`;
  }
}
