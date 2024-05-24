import express from "express";
import Movies from "../controllers/moviesController.js";
import auth from "../middlewares/auth.js";

const moviesRoutes = express.Router();

moviesRoutes.get("/movies", auth, Movies.getAll);
moviesRoutes.post("/movies", auth, Movies.post);
moviesRoutes.put("/movies/:id", auth, Movies.put);
moviesRoutes.delete("/movies/:id", auth, Movies.delete);
export default moviesRoutes;
