import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

const tokenGenerator = (payload: object): string => jwt.sign(payload, JWT_SECRET);

const tokenValidate = () => {

};

export { tokenGenerator, tokenValidate };
