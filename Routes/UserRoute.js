import express from "express";

import {
  deleteUser,
  followUser,
  getAllUsers,
  getUser,
  getUserFriends,
  unfollowUser,
  updateUser,
} from "../Controllers/UserController.js";

const router = express.Router();

// !----- getting all user
router.get("/all", getAllUsers);

//! ------ GETING A USER
router.get("/", getUser);

// !------ UPDATE A USER
router.put("/:id", updateUser);

// !------ DELETE A USER
router.delete("/:id", deleteUser);

// !------- GET FRIENDS OF A USER
router.get("/friends/:userId", getUserFriends);

// !------ FOLLOW A USER
router.put("/:id/follow", followUser);

// !------ UNFOLLOW A USER
router.put("/:id/unfollow", unfollowUser);

export default router;
