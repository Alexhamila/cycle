import { compare, hash } from 'bcrypt';

export async function hashPassword(password: any) {
  const hashedPassword = await hash(password, 12);
  return hashedPassword;
}

export async function verifyPassword(password: any, hashedPassword: any) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
