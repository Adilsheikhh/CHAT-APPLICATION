import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Image: { type: String,},
    });
     
    const UserModel =mongoose.model('User', UserSchema);
    export default UserModel;
