import express from "express";
import { register } from "../controllers/loginController";

export const login = express.Router();

login.post("/register", register);