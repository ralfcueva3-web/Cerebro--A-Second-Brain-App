import {type Request, type Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/User.js";


//============Signup logic===========
export const signup = async (req: Request, res: Response) => {
    try{
        const { username, password } = req.body;

        const existing = await User.findOne({username});
        if(existing){
            return res.status(403).json({ msg: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({username, password: hashedPassword});

        res.status(200).json({msg: "Signed Up"});
    } catch(err) {
        res.status(500).json({msg: "Something went wrong"})
    }
}

//=============Signin============


