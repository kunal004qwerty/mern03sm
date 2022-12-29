import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import express from "express";

// !------ GETTING A USER
// In_PostMan
// * example http://localhost:5000/api/users?username=hunnytest01
// * example http://localhost:5000/api/users?userId=63a2b4e4b8fd814979d41815

export const getUser = async (req, res) => {
  // what is query
  // means /user/userId = 12345 ifExis otherwise
  // /user/username = kunalRathor

  const userId = req.query.userId;
  const username = req.query.username;
  // const userId = req.params.id;

  try {
    const user = userId
      ? await UserModel.findById(userId)
      : await UserModel.findOne({ username: username });
    // wedon't want to see password and updatedat
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
    // console.log(other);
    // res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
    // console.log(error);
  }
};
//!------ Get All Users

export const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find();
    users = users.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// !---- UPDATE USER BY ID
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, password } = req.body;

  if (id === _id) {
    // ! ----- Update_Password
    if (password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        return res.status.json(err);
      }
    }
    // ! ----------Update_User
    try {
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // res.status(200).json(`ACCOUNT HAS BEEN UPDATED of ${req.params.id}`); // for PostMan
      res.status(200).json(user);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(500).json("Access Denied You can only update your own profile");
  }
};

// !----- DELETE USER
export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json(`ACCOUNT HAS BEEN DELETED of ${req.params.id}`);
    } catch (error) {
      res.status(500).send(error);
      // console.log(error);
    }
  } else {
    res.status(403).json("YOU CAN DELETE ONLY YOUR ACCOUNT");
  }
};

// !-------- FOLLOW A USER
export const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You can't follow your self");
  }
};

// !----------------GET_FRIENDS
export const getUserFriends = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return UserModel.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend) => {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    res.status(500).json(err);
  }
};

// !------ UNFOLLOW A USER
export const unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);
      const currentUser = await UserModel.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you don't unfollow this user");
      }
    } catch (error) {
      res.status(500).json(error);
      // console.log(error);
    }
  } else {
    res.status(403).json("You can't unfollow your self");
  }
};
