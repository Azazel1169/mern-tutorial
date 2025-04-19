import express from "express";
import { signup, login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

export default router;
// This code defines an Express router for authentication routes. It imports the necessary modules and functions, creates a new router instance, and sets up three routes: "/signup", "/login", and "/logout". Each route is associated with a corresponding controller function that handles the request and response. Finally, the router is exported for use in other parts of the application.
