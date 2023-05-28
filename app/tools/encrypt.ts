import { hash, compare } from "bcrypt";

export async function hashPassword(password: string) {
  try {
    return await hash(password, 10);
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function comparePassword(password: string, hash: string) {
  try {
    return await compare(password, hash);
  } catch (err) {
    console.log(err);
    return false;
  }
}