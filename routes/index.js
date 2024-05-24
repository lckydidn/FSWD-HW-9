import express from "express";
import userRoutes from "./userRoute.js";
import movieRoutes from "./moviesRoute.js";

const router = express.Router();

router.use("/api", userRoutes);
router.use("/api", movieRoutes);

export default router;
