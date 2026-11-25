import { type Request, type Response, type NextFunction } from 'express';

export const logger = (req:Request, res:Response, next:NextFunction) => {
    const {method, originalUrl} = req;
    const newDate = new Date();
    console.log(`[${newDate.toISOString()}] ${method} ${originalUrl}`);
    next();
};
