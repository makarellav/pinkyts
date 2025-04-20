import type { TokenType } from "./tokens";

export class Token {
  constructor(
    public type: TokenType,
    private lexeme: string,
  ) {}
}
