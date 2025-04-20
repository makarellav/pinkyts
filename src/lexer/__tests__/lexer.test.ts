// import { test, expect } from "bun:test";
// import { Lexer } from "../";
// import { Token } from "../../token";
// import {
//   charCodes,
//   tokens,
//   type SingleCharTokenType,
// } from "../../token/tokens";

// type Entries<TObject> = {
//   [K in keyof TObject]: [K, TObject[K]];
// }[keyof TObject][];

// const cases = (Object.entries(charCodes) as Entries<typeof charCodes>).map(
//   ([type, charCode]) => [
//     String.fromCharCode(charCode),
//     new Token(type, String.fromCharCode(charCode)),
//   ],
// );

// test.each(cases)("should correctly tokenize %p", (char, token) => {
//   expect(token);
// });
