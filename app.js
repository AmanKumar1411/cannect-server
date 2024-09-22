import express from "express" ;
import cors from "cors";
import cookieParser from "cookie-parser";
import http from  'http';
import authRoutes from "./routes/authRoutes.js";
import 'dotenv/config';

const app = express();
app.use(
    cors({
      origin: [process.env.ORIGIN],
      methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
      credentials: true,
    })
  );
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use("/uploads/profiles", express.static("uploads/profile"));
app.use(cookieParser())
app.use("/api/auth", authRoutes);
const server = http.createServer(app)

export{app,server}