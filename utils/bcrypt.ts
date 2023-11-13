import { hashSync, compareSync } from "bcrypt";

const salt = 10;

function generateHash(password: string): string {
  return hashSync(password, salt);
}

function decodeHash(password: string, hash: string): boolean {
  return compareSync(password, hash);
}

export { generateHash, decodeHash };
