import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export class LoginController {
  static login = async (req: Request, res: Response, next: any) => {
    try {
        // TODO: Add login checker
        if(req.body.username === 'admin' && req.body.password === 'admin') {
            return res.json({
                username: req.body.username,
                jwt: jwt.sign({
                    username: req.body.username,
                }, process.env.JWT_TOKEN_SECRET)
            });
        }

        res.status(401).json({
            error: {
                message: 'Wrong username or password!'
            }
        });
    } catch (error) {
      next({ log: true, error });
    }
  };
}
