import {Schema, model} from "mongoose";
import { avenueSchema } from "./AvenueModel.js";


export const UserSchema = new Schema({
  username: {
    type : String,
    required: true
  },
  email: { type: String, unique: true , required: true},
  password: {
    type : String,
    required: true
  },
  profilePicture : {
    type : String,
    default : ""
  },
  createdAt : {
    type : Date,
    default : new Date().toLocaleString()
  },
  updatedAt : Date,
  reservations: {
    type : [avenueSchema],
    default: []
  },

  favouriteAvenues: [String],

});

export default model("user",UserSchema);