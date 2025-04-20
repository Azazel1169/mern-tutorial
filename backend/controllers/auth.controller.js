import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      // Checks if all fields are provided
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email }); // Checks if the user already exists in the database
    console.log("userAlreadyExists", userAlreadyExists);
    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      }); // If the user already exists, returns a 400 status with an error message
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hashes the password using bcrypt with a salt rounds of 10
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); // Generates a random 6-digit verification token
    // Creates a new user in the database with the provided name, email, hashed password, verification token, and verification expires at
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await user.save(); // Saves the user to the database.

    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined, // Excludes the password from the response.
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const login = async (req, res) => {
  res.send("login working route");
};
export const logout = async (req, res) => {
  res.send("logout working route");
};
