import express from "express";
import { AddMessage, GetMessage } from "../Controllers/MessagesController.js";
const router = express.Router();

// !---------------ADD_MESSAGES
router.post("/", AddMessage);

// !--------------GET_MESSAGES
router.get("/:conversationId", GetMessage);

export default router;
