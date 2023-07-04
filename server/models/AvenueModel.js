import {Schema, model} from "mongoose";
import { reservationSchema } from "./ReservationModel.js";


export const avenueSchema = Schema({
    kategori: {
        type: String,
        required: true
    },
    available: {
        type: String,
        required: true
    },
    alamat: {
        type: {
            name: String,
            state: String,
            country: String,
            latitude: Number,
            longitude: Number
        },
        required: true
    },
    informasiDasar : {
        tamu: Number,
        kamar: Number,
        tempatTidur: Number,
        kamarMandi: Number,
    },
    fasilitas: {
        type: {
            wifi : Boolean,
            televisi : Boolean,
            dapur : Boolean,
            tempatparkir : Boolean,
            ac : Boolean,
            kolamrenang : Boolean,
            bakmandi : Boolean,
            perapian : Boolean,
            piano : Boolean,
            peralatanolahraga : Boolean,
            p3k : Boolean,
            pemadamapi : Boolean,
        },
        required : true
    },
    foto: [{
        url: String,
        name: String
    }],
    ownerId: {
        type: String,
        required: true
    },
    judul: String,
    deskripsi: String,
    favourites : [String],
    harga: Number ,
    reservations : {
        type : [reservationSchema],
        default : []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: Date
});

export default model("avenue",avenueSchema);