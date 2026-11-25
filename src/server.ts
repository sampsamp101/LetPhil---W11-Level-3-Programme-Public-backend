import express from "express";
import router from "./routes/products.routes.ts";
import {logger} from "./middleware/logger.ts"

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(logger);
app.use("/products", router);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

