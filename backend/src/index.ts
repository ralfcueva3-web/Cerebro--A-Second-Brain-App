;import dotenv from "dotenv";
dotenv.config();


import express from "express";
import { connectDb } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import brainRoutes from "./routes/brain.js";
import contentRoutes from "./routes/content.js";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/brain", brainRoutes);
app.use("/content", contentRoutes);

const PORT = process.env.PORT || 3000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})