import * as jwt from 'jsonwebtoken';
import { ITokenDecoded } from '../interfaces';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const tokenGenerator = (payload: object): string => jwt.sign(payload, JWT_SECRET);

const tokenDecode = (token: string): ITokenDecoded | undefined => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded as ITokenDecoded;
  } catch {
    return undefined;
  }
};

const tokenValidate = () => {

};

export { tokenGenerator, tokenValidate, tokenDecode };
