import { JwtPayload, sign, verify } from "jsonwebtoken";
import { IUser } from "../models/User";

interface IUserToken extends IUser {
  iat: number;
  exp: number;
}

const secret = process.env.NEXTAUTH_SECRET as string;

export async function JWT(user: IUserToken) {
  try {
    const Payload = {
      _id: user._id,
      sub: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //30 dias
    };
    return sign(Payload, secret);
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function VerifyJWT(token: string) {
  try {
    const decoded = verify(token, secret) as JwtPayload;
    return decoded;
  } catch (err) {
    console.log(err);
    return false;
  }
}