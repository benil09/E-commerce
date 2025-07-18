import express from "express"
import {protectRoute ,adminRoute } from "../middlewares/auth.middleware.js"
import { createProduct,deleteProduct, getAllProducts } from "../controllers/product.controller.js"
const router = express.Router()

router.get("/",protectRoute,adminRoute,getAllProducts)
router.post("/",protectRoute,adminRoute,createProduct)
router.post("/:id",protectRoute,adminRoute,deleteProduct)



export default router;