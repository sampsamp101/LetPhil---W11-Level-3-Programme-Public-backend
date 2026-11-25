import { type Request, type Response, type NextFunction } from "express";

export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
  const body: unknown = req.body;

  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return res.status(400).json({ error: "Request body must be a JSON object" });
  }

  const { name, price } = body as { name?: unknown; price?: unknown };

  if (typeof name !== "string" || name.trim().length === 0) {
    return res.status(400).json({ error: "Name is required" });
  }
  if (price === undefined || price === null || price === "") {
    return res.status(400).json({ error: "Price is required" });
  }
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return res.status(400).json({ error: "Price must be a positive number" });
  }

  return next();
};
