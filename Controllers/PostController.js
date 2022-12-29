import PostModel from "../Models/PostModel.js";
import UserModel from "../Models/UserModel.js";

// !---- CREATE A POST
export const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
    // console.log(error);
  }
};

// !---- UPDATE A POST
export const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("You can only update your post");
    }
  } catch (error) {
    res.status(500).json(error);
    // console.log(error);
  }
};

// ! ---- DELETE A POST
export const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been delete");
    } else {
      res.status(403).json("You can only delete your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// !----- GET A POST
export const getpost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ! ---- LIKE/DISLIKE A POST
export const Like_Dislike_Post = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    // liked a post
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      // disliked a post
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// !------GET ALL POST (timeline)
export const getTimeLinePosts = async (req, res) => {
  try {
    const currentUser = await UserModel.findById(req.params.userId);
    const userPosts = await PostModel.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return PostModel.find({ userId: friendId });
      })
    );
    res.json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(500).json(error);
    // console.log(error);
  }
};

// ! ------ GET USER ALL POST (timeline)
export const getUserAllPost = async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.params.username });
    const posts = await PostModel.find({ userId: user._id });
    res.status(200).json(posts);
    // console.log(posts);
  } catch (error) {
    res.status(500).json(error);
    // console.log(error);
  }
};
