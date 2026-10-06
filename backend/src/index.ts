import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import { connectDb } from "./config/db.js";

import authRouter from "./routes/auth.js";
import brainRouter from "./routes/brain.js";
import contentRouter from "./routes/content.js";


const app = express();


app.use(express.json());

app.use(cors());


connectDb();


app.use("/auth", authRouter);
app.use("/brain", brainRouter);
app.use("/content", contentRouter);


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});