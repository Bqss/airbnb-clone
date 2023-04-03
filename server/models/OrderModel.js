import {model, Schema} from "mongoose";

const orderSchema = Schema({
    id_avenue: {
        type: String,
        required: true
    },
    tanggalCheckin: {
        type: String,
        required : true,
    },
    tanggalCheckout: {
        type: String,
        required : true,
    },
    jumlahTamu: {
        type: Number,
        required: true
    }
});


export default model("orders",orderSchema);