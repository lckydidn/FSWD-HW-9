import express from "express";
import Users from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const userRoutes = express.Router();

userRoutes.get("/users", auth, Users.getAll);
userRoutes.post("/register", Users.register);
userRoutes.post("/login", Users.login);
userRoutes.put("/users/:id", auth, Users.put);
userRoutes.delete("/users/:id", auth, Users.delete);

export default userRoutes;
