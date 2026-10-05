import mongoose, {Schema, Document, Types} from "mongoose";

export const contentTypes = ["youtube", "twitter", "document", "link", "github"] as const;

export interface IContent extends Document {
    link: String;
    type: (typeof contentTypes)[number];
    title: String;
    tags: Types.ObjectId[];
    userId: Types.ObjectId;
}

const contentSchema = new Schema<IContent>({
    link: {type: String, required: true},
    type: {type: String, enum: contentTypes, required: true},
    title: {type: String, required: true},
    tags: [{type: Schema.Types.ObjectId, ref:"Tag"}],
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true}
}, 
{timestamps: true}
)
export const Content = mongoose.model<IContent>("Content", contentSchema);