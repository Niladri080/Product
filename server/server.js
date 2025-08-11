import express from "express";
import AuthRouter from "./Routes/userAuthRoutes.js";
import homeRouter from "./Routes/homeRouter.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { adminMiddleware, authMiddleware } from "./Middleware/authMiddleware.js";
import adminRouter from './Routes/adminAuthRouter.js'
import adminDashRouter from './Routes/adminRouter.js'
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));
await connectDB();
app.use("/api/user", AuthRouter);
app.use("/api/dashboard", authMiddleware, homeRouter);
app.use("/api/admin",adminRouter)
app.use("/api/admin/dashboard",adminMiddleware,adminDashRouter);
app.post("/api/contact", async (req, res) => {
  try {
    const formData = req.body;
    await fetch(
      "https://script.google.com/macros/s/AKfycbynqJJh4YaHw826Ct5dw0lcmrwGjxqQtYhVVoDxgdY2QssSFBXyOBlIrsY23CyV2oplXA/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    return res.status(200).json({ message: "Your response sent successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Something went wrong" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
