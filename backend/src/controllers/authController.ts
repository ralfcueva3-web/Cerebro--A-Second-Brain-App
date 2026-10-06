import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

// ==================================================
// SIGNUP
// ==================================================

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // -------------------------------
        // Check if username/password exist
        // -------------------------------

        if (!username || !password) {
            return res.status(400).json({
                msg: "Username and password are required"
            });
        }

        // -------------------------------
        // Username validation
        // 3-10 characters
        // Only letters and numbers
        // -------------------------------

        const usernameRegex = /^[a-zA-Z0-9]{3,10}$/;

        if (!usernameRegex.test(username)) {
            return res.status(400).json({
                msg: "Username must be 3-10 characters long and contain only letters and numbers"
            });
        }

        // -------------------------------
        // Password validation
        // 8-20 characters
        // At least:
        // 1 lowercase
        // 1 uppercase
        // 1 number
        // 1 special character
        // -------------------------------

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,20}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                msg: "Password must be 8-20 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character"
            });
        }

        // -------------------------------
        // Check existing user
        // -------------------------------

        const existing = await User.findOne({
            username
        });

        if (existing) {
            return res.status(403).json({
                msg: "User already exists"
            });
        }

        // -------------------------------
        // Hash password
        // -------------------------------

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // -------------------------------
        // Create user
        // -------------------------------

        await User.create({
            username,
            password: hashedPassword
        });

        return res.status(200).json({
            msg: "Signed Up"
        });

    } catch (err) {

        console.log("SIGNUP ERROR:", err);

        return res.status(500).json({
            msg: "Something went wrong"
        });
    }
};


// ==================================================
// SIGNIN
// ==================================================

export const signin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // -------------------------------
        // Check if username/password exist
        // -------------------------------

        if (!username || !password) {
            return res.status(400).json({
                msg: "Username and password are required"
            });
        }

        // -------------------------------
        // Find user
        // -------------------------------

        const user = await User.findOne({
            username
        });

        if (!user) {
            return res.status(403).json({
                msg: "Invalid username or password"
            });
        }

        // -------------------------------
        // Compare password
        // -------------------------------

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(403).json({
                msg: "Invalid username or password"
            });
        }

        // -------------------------------
        // Generate JWT
        // -------------------------------

        const token = jwt.sign(
            {
                userId: user._id.toString()
            },
            process.env.JWT_SECRET as string
        );

        // -------------------------------
        // Send token
        // -------------------------------

        return res.status(200).json({
            token
        });

    } catch (err) {

        console.log("SIGNIN ERROR:", err);

        return res.status(500).json({
            msg: "Something went wrong"
        });
    }
};