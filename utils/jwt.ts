import * as jwt from "jsonwebtoken";

interface Token {id: number; username: string; role:number; }
const secret = "abcde";

function generateToken(payload: Token): string {
  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

function decodeToken(token: string): Token {
  return jwt.verify(token, secret) as Token;
}

export { decodeToken, generateToken };
