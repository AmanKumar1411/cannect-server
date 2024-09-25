import cookie from "cookie-parser";
import jwt from "jsonwebtoken";
import User from "../models/Usermodel.js";
import { compare } from "bcrypt";
import { unlinkSync, renameSync } from "fs";
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signUp = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send("Email and Password required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).send("User already exists");
    }

    const user = await User.create({ email, password });

    response.cookie("jwt", createToken(user), {
      maxAge,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return response.status(201).json({
      user: {
        id: user.id,
        email: user.email,
        profileSetup: user.profileSetup,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal server error");
  }
};

export const logIn = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).send("Email and Password required");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.status(400).send("User does not exist");
    }

    const passwordMatch = await compare(password, existingUser.password);
    if (!passwordMatch) {
      return response.status(400).send("Password is incorrect");
    }

    response.cookie("jwt", createToken(existingUser), {
      maxAge,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });

    return response.status(200).json({
      user: {
        id: existingUser.id,
        email: existingUser.email,
        profileSetup: existingUser.profileSetup,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        image: existingUser.image,
        color: existingUser.color,
      },
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal server error");
  }
};

export const getUserInfo = async (request, response) => {
  try {
    const userData = await User.findById(request.userId);
    if (!userData) {
      return response.status(401).send("Profile with ID not found");
    }
    return response.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal server error");
  }
};

export const updateProfile = async (request, response) => {
  try {
    const user = request.user;
    const { firstName, lastName, color } = request.body;

    if (!firstName || !lastName) {
      return response
        .status(400)
        .send("First Name and Last Name are required!");
    }

    const userData = await User.findByIdAndUpdate(
      user._id,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );

    if (!userData) {
      return response.status(404).send("User not found");
    }
    return response.status(200).json(userData);
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal server error");
  }
};

export const addProfileImage = async (request, response) => {
  try {
    if (!request.file) {
      return response.status(400).send("File is required");
    }

    const updateUser = await User.findByIdAndUpdate(
      request.user._id,
      { Image: request.file.path },
      { new: true, runValidators: true }
    );
    return response.status(200).json({
      image: updateUser.Image,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send("Internal server error");
  }
};

export const removeProfileimage = async (request, response) => {
  try {
    const { userId } = request;
    const { firstName, lastName, color } = request.body;
    if (!firstName || !lastName) {
      return response
        .status(400)
        .send("FirstName LastName and Color is require!!");
    }
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        color,
        profileSetup: true,
      },
      { new: true, runValidators: true }
    );
    return response.status(200).json({
      id: userData.id,
      email: userData.email,
      profileSetup: userData.profileSetup,
      firstName: userData.firstName,
      lastName: userData.lastName,
      image: userData.image,
      color: userData.color,
    });
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal server error");
  }
};

export const Logout = async (request, response) => {
  try {
    response.cookie("jwt", "", {
      maxAge: 1,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    return response.status(200).send("Logout Successfull");
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal server error");
  }
};
