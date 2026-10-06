import { type Request, type Response } from "express";
import { Link } from "../models/Link.js";
import { Content } from "../models/Content.js";
import { User } from "../models/User.js";
import crypto from "crypto";

//================Share Brain===========

export const shareBrain = async (req: Request, res: Response) => {
    try{
        const { share } = req.body;

        if(share){
            const existing = await Link.findOne({userId: req.userId})
            if(existing){
                return res.status(200).json({hash: existing.hash});
            }
            const hash = crypto.randomBytes(8).toString("hex");
            await Link.create({hash, userId: req.userId});
            return res.status(200).json({ hash });
        }
        await Link.deleteOne({userId: req.userId});
        res.status(200).json({msg: "Sharing disabled"});
    } catch (err) {
        res.status(500).json({msg: "Something went wrong"})
    }
}

//================getting brain===================

export const getSharedBrain = async (req: Request, res:Response) => {
    try{
        const shareLink  = req.params.shareLink as string
        
        const link = await Link.findOne({ hash: shareLink});
        if (!link){
            return res.status(404).json({msg: "Invalid share link"})
        }

        const user = await User.findById(link.userId);
        const content = await Content.find({userId: link.userId}).populate("tags", "title");

        res.status(200).json({username: user?.username, content});
    } catch(err){
        res.status(500).json({msg: "Something went wrong"})
    }
}