import {Schema, model} from "mongoose";
import { avenueSchema } from "./AvenueModel.js";


const UserSchema = new Schema({
  name: {
    type : String,
    required: true
  },
  email: { type: String, unique: true },
  password: String,
  profilePicture : String,
  createdAt : {
    type : Date,
    default : new Date().toLocaleString()
  },
  updatedAt : Date,
  reservations: {
    type : [avenueSchema],
    default: []
  },

  favouriteAvenues: [String]

});

export default model("user",UserSchema);