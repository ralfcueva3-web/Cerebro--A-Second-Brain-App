import { type Request, type Response } from "express";
import crypto from "crypto";

import { Link } from "../models/Link.js";
import { User } from "../models/User.js";
import { Content } from "../models/Content.js";


// ================= SHARE BRAIN =================

export const shareBrain = async (
    req: Request,
    res: Response
) => {

    try {

        const { share } = req.body;


        // ================= ENABLE SHARING =================

        if (share) {

            // Generate random hash
            const hash = crypto
                .randomBytes(8)
                .toString("hex");


            console.log("USER ID:", req.userId);


            // Create share link
            await Link.create({
                hash,
                userId: req.userId
            });


            return res.status(200).json({
                hash
            });
        }


        // ================= DISABLE SHARING =================

        await Link.deleteOne({
            userId: req.userId
        });


        return res.status(200).json({
            msg: "Sharing disabled"
        });


    } catch (err) {

        console.log("SHARE BRAIN ERROR:", err);

        res.status(500).json({
            msg: "Something went wrong"
        });
    }
};



// ================= GET SHARED BRAIN =================

export const getSharedBrain = async (
    req: Request,
    res: Response
) => {

    try {

        const shareLink = req.params.shareLink as string;


        // Find share link
        const link = await Link.findOne({
            hash: shareLink
        });


        if (!link) {

            return res.status(404).json({
                msg: "Invalid share link"
            });
        }


        // Find owner
        const user = await User.findById(
            link.userId
        );


        // Find user's content
        const content = await Content
            .find({
                userId: link.userId
            })
            .populate("tags", "title");


        return res.status(200).json({
            username: user?.username,
            content
        });


    } catch (err) {

        console.log("GET SHARED BRAIN ERROR:", err);

        res.status(500).json({
            msg: "Something went wrong"
        });
    }
};