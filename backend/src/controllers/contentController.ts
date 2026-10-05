import { type Request, type Response } from "express";
import { Content } from "../models/Content.js";
import { Tag } from "../models/Tag.js";

export const addContent = async(req: Request, res: Response) => {
    try{
        const { link, type, title, tags = [] } = req.body;

        const tagIds = [];
        for(const name of tags){
            const tag  = await Tag.findOneAndUpdate(
                { title: name.toLowerCase().trim()},
                { title: name.toLowerCase().trim()},
                { upsert: true, new: true}
            );
            tagIds.push(tag._id);   
        }
        await Content.create({link, type, title, tags: tagIds, userId: req.userId})

        return res.status(200).json({msg: "Content added"})
    }catch (err){
        return res.status(500).json({msg: "Something went wrong"})
    }
}