import mongoose, {
    Schema,
    Document
} from "mongoose";


export interface ILink extends Document {

    hash: string;

    userId: mongoose.Types.ObjectId;
}


const linkSchema = new Schema<ILink>(

    {
        hash: {
            type: String,
            required: true,
            unique: true
        },

        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },

    {
        timestamps: true
    }
);


export const Link = mongoose.model<ILink>(
    "Link",
    linkSchema
);