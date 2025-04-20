import { Lexer } from "./src/lexer";

async function run() {
  const [path] = Bun.argv.slice(2);

  if (!path) {
    throw new Error(`Usage: bun run start <filename>`);
  }

  const file = Bun.file(path);

  const source = await file.bytes();

  const tokens = new Lexer(source).tokenize();

  for (const token of tokens) {
    console.log(token);
  }
}

run();
