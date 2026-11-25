import { type Request, type Response, type NextFunction } from "express";

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
    // 1. Id check: only on routes that have /:id (GET one, PUT, DELETE)
    const { id } = req.params;
    if (id !== undefined) {
        const numericId = Number(id);
        if (!Number.isInteger(numericId) || numericId <= 0) {
            return res.status(400).json({ error: "Invalid id! It must be a positive whole number." });
        }
    }

    // 2. Body check: only for methods that send a product body
    if (req.method === "POST" || req.method === "PUT") {
        const { name, price } = req.body ?? {};

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ error: "Name is required" });
        }

        if (price === undefined) {
            return res.status(400).json({ error: "Price is required" });
        }

        if (typeof price !== "number") {
            return res.status(400).json({ error: "Data is not of Number! remember to input data without quotes." });
        }

        if (!Number.isFinite(price) || price <= 0) {
            return res.status(400).json({ error: "Double Check Price! Price must be a positive number and greater than zero!" });
        }
    }

    next();
};