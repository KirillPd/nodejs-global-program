import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.path === '/login') return next();
    // @ts-ignore
    let token = req.headers['authorization']; // Express headers are auto converted to lowercase
  
    if (token) {
        if (token.indexOf('Bearer ') > -1) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    error: {
                        message: 'Token is invalid!'
                    }
                });
            }

            next();
        });
    } else {
      return res.status(401).json({
        error: {
            message: 'Auth token is not supplied'
        }
      });
    }
  };