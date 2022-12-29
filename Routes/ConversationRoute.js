import express from "express";

import {
  GetConversation,
  NewConversation,
  TwoUserIdConversation,
} from "../Controllers/ConversationController.js";

const router = express.Router();

//!---------------------------- NEW CONVERSATION
router.post("/", NewConversation);

//!------------------------------ GET CONVERSATION OF THE USER
router.get("/:userId", GetConversation);
// !--- -------------------GET CONNVERSATION INCLUDES TWO USERID
router.get("/find/:firstUserId/:secondUserId", TwoUserIdConversation);

export default router;
