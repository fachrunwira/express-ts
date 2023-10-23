import express from "express";
import controller from "../controllers/loginController";

export const login = express.Router();

login.post("/register", controller.register);
login.get("/multi", controller.multiRegister)