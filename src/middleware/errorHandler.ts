
import { type Request, type Response, type NextFunction } from 'express';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent){
      return next(err); 
    }
    return res.status(500).json({error: `Error encountered: ${err.message}`});
}