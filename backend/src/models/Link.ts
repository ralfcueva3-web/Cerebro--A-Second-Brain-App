import mongoose, {Document, Schema, Types} from "mongoose";

export interface ILink extends Document{
    hash: String;
    userId: Types.ObjectId;
}
const linkSchema = new Schema<ILink>({
    hash: {type: String, required: true, unique: true},
    userId: {type: Schema.Types.ObjectId, ref: "User", required: true, unique: true}
}, {timestamps: true}
)

module.exports = mongoose.model<ILink>("Link", linkSchema);