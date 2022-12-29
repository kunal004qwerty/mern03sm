import express from "express";
import {
  createPost,
  deletePost,
  getpost,
  getTimeLinePosts,
  getUserAllPost,
  Like_Dislike_Post,
  updatePost,
} from "../Controllers/PostController.js";

const router = express.Router();
// !----- CREATE A POST
router.post("/", createPost);

// !----- UPDATE A POST
router.put("/:id", updatePost);

// !----- DELETE A POST
router.delete("/:id", deletePost);

// !----- GET A POST
router.get("/:id", getpost);

// !----- Like/Dislike a post
router.put("/:id/like", Like_Dislike_Post);

// !----- GET ALL POST (TIMELINE)
router.get("/timeline/:userId", getTimeLinePosts);

// ! ------ GET USER ALL POST (timeline)
router.get("/profile/:username", getUserAllPost);

export default router;
