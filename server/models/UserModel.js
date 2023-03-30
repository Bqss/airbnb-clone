import {Schema, model} from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export default model("user",userSchema);