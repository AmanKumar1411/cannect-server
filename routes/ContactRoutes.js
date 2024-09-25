import { Router } from "express";

import { verifyJwtToken } from "../middlewares/AuthMiddleware.js";
import { searchContact } from "../controllers/ContactControllers.js";

const contactRoutes = Router();
contactRoutes.post("/search", verifyJwtToken, searchContact);
export default contactRoutes;
