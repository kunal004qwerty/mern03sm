import express from "express";
const router = express.Router();

import Message from "../Models/Message.js";

// !---------------ADD_MESSAGES
export const AddMessage = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

// !--------------GET_MESSAGES
export const GetMessage = async (req, res) => {
  try {
    const message = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default router;
