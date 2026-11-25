import {Router} from "express";
import { getAllProducts,getSpecificProduct,addNewProduct, changeProduct, deleteSpecificProductId } from "../controllers/products.controller";
import { validateProduct } from "../middleware/validateProduct";

const router = Router();

router.get("/", getAllProducts);

router.get("/:id", validateProduct, getSpecificProduct);

router.post("/", validateProduct, addNewProduct);

router.put("/:id",validateProduct, changeProduct);

router.delete("/:id", validateProduct, deleteSpecificProductId);

export default router