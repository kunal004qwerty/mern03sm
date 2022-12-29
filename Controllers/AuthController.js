import UserModel from "../Models/UserModel.js";
import bcrypt from "bcrypt";

//! ----- REGISTERING A NEW USER
export const registerUser = async (req, res) => {
  try {
    //!--- generate a new password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const Old_Password = req.body.password;
    // console.log("oldPassword : ", Old_Password);
    // console.log("hashedPassword : ", hashedPassword);

    //!--- create a new user
    const newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    // !----- Preventing save user again
    const oldUser = await UserModel.findOne({ username: req.body.username });
    if (oldUser) {
      return res
        .status(400)
        .json({ message: "username is already registered !" });
    } else {
      //!--- save user and send response
      const user = await newUser.save();
      res.status(200).json(user);
      // console.log(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    // console.log(error);
  }
};

// !------ LOGIN A USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // !--- Find a users
    const result = await UserModel.findOne({ email: email });

    if (result != null) {
      // !--- validate password
      const validPassword = await bcrypt.compare(password, result.password);
      //   ====================================
      if (validPassword) {
        // !--- send response
        res.status(200).json(result);
      } else {
        res.status(400).json("Wrong username or password");
      }
    } else {
      res.status(400).json("Wrong username or password");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
    // console.log(error);
  }
};
