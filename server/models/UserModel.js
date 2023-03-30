import {Schema, model} from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: true,
        required: true
    },
    gambarProfile: String,
    bio: String,
    lokasi: String,
    pekerjaan: String
});

export default model("user",userSchema);