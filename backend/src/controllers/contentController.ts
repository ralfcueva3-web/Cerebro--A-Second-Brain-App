import { type Request, type Response } from "express";
import { Content } from "../models/Content.js";
import { Tag } from "../models/Tag.js";


//===============adding comtent=============

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

//================get content===============
export const getContent = async (req: Request, res: Response) => {
  try {
    const content = await Content.find({ userId: req.userId })
      .populate("tags", "title")
      .populate("userId", "username");

    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

//==============deleting content===================

export const deleteContent = async(req: Request, res: Response) => {
    try{
        const { contentId } = req.body;
        const result = await Content.deleteOne({_id: contentId, userId: req.userId})

        if(result.deletedCount == 0){
            return res.status(430).json({msg: "Not Found or Not yours"});
        }
        res.status(200).json({msg: "Deleted"});
    } catch(err){
        res.status(500).json({msg: "something went wrong"});
    }
}