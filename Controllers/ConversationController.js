import express from "express";

import Conversation from "../models/Conversation.js";

const router = express.Router();

//!------------ NEW CONVERSATION
export const NewConversation = async (req, res) => {
  try {
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    const allreadyMembers = await Conversation.findOne({
      members: [req.body.senderId, req.body.receiverId],
    });
    const allreadyMembers01 = await Conversation.findOne({
      members: [req.body.receiverId, req.body.senderId],
    });
    // console.log(allreadyMembers);
    if (allreadyMembers || allreadyMembers01) {
      return res
        .status(400)
        .json({ message: "username is already Members of converstions!" });
    } else {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json(error);
  }
};

//!--------- GET CONVERSATION OF THE USER
export const GetConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

// !--- GET CONNVERSATION INCLUDES TWO USERID
export const TwoUserIdConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

export default router;
