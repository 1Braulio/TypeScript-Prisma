import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// export const SECRET_KEY: Secret = 'secretKey';

export interface CustomRequest extends Request {
 token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, 'secretKey');
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   return res.status(401).send('Por favor autentiquese para usar esta funcion');
 }
};