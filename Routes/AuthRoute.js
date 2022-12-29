import express from "express";

import { loginUser, registerUser } from "../Controllers/AuthController.js";

const router = express.Router();

//!----  REGISTER

router.post("/register", registerUser);

//! ---- LOGIN
router.post("/login", loginUser);

// !----------

export default router;
