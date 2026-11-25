import {Router} from "express";
import { getAllProducts,getSpecificProduct,addNewProduct, changeProduct, deleteSpecificProductId } from "../controllers/products.controller";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", getSpecificProduct);

router.post("/", addNewProduct);

router.put("/:id",changeProduct);

router.delete("/:id", deleteSpecificProductId);

export default router