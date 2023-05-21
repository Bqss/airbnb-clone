import { Schema, model } from "mongoose";

export const reservationSchema = new Schema({
    userId : {
        type: String,
        required: true
    },
    listingId: {
        type: String,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalprice: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default : new Date()
    }
});



export default model("reservation", reservationSchema);