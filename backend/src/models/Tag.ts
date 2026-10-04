import mongoose, {Schema, Document} from "mongoose";

export interface ITag extends Document{
    title: String
}
const tagSchema = new Schema<ITag>({
    title: {type: String, required: true, unique: true}
}, {timestamps: true}
)

module.exports = mongoose.model<ITag>("Tag", tagSchema);