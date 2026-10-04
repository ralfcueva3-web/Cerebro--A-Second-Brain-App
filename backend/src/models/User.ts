import mongoose, { Schema, Document } from "mongoose";

//IUser is a model ............. model is an instance of a model class

export interface IUser extends Document {
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username : {type: String, required: true},
    password: {type: String, required: true}
}, {timestamps: true}
)

module.exports = mongoose.model<IUser>("User", userSchema);

