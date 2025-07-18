import dotenv from "dotenv";
import express from "express";
import connectDB from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
//authentication
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("server is running ");
  connectDB();
});
