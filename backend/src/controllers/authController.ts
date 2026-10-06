// import {type Request, type Response} from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import { User } from "../models/User.js";


// //============Signup logic===========
// export const signup = async (req: Request, res: Response) => {
//     try{
//         const { username, password } = req.body;

//         const existing = await User.findOne({username});
//         if(existing){
//             return res.status(403).json({ msg: "User already exists"});
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         await User.create({username, password: hashedPassword});

//         res.status(200).json({msg: "Signed Up"});
//     } catch(err) {
//         res.status(500).json({msg: "Something went wrong"})
//     }
// }

// //=============Signin============

// export const signin = async (req: Request, res: Response) => {
//     try{
//         const { username, password} = req.body;

//         const user = await User.findOne({username});
//         if(!user){
//             return res.status(403).json({msg: "Wrong Credentials"});
//         }
//         const match = await bcrypt.compare(password, user.password)
//         if(!match){
//             return res.status(403).json({msg: "Wrong Credentials"});
//         }
//         const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {
//             expiresIn: "7d"
//         })
//         res.status(200).json({token});
//     } catch(err){
//         res.status(500).json({msg: "Something went wrong"});
//     }
// }


import { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";

// ================= SIGNUP =================

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const existing = await User.findOne({ username });

        if (existing) {
            return res.status(403).json({
                msg: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            password: hashedPassword
        });

        res.status(200).json({
            msg: "Signed Up"
        });

    } catch (err) {
        console.log("SIGNUP ERROR:", err);

        res.status(500).json({
            msg: "Something went wrong"
        });
    }
};


// ================= SIGNIN =================

export const signin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(403).json({
                msg: "Invalid username or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(403).json({
                msg: "Invalid username or password"
            });
        }

        // IMPORTANT:
        // JWT payload contains "userId"
        const token = jwt.sign(
            {
                userId: user._id.toString()
            },
            process.env.JWT_SECRET as string
        );

        res.status(200).json({
            token
        });

    } catch (err) {
        console.log("SIGNIN ERROR:", err);

        res.status(500).json({
            msg: "Something went wrong"
        });
    }
};