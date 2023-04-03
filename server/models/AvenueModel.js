import {Schema, model} from "mongoose";

const avenueSchema = Schema({
    kategori: {
        type: String,
        required: true
    },
    available: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    informasiDasar : {
        jumlahTamu: Number,
        jumlahKamar: Number,
        jumlahTempatTidur: Number,
        jumlahKamarMandi: Number,
    },
    fasilitas: {
        type: [String],
        required : true
    },
    foto: [{
        url: String,
        name: String
    }],
    judul: String,
    tag: String,
    deskripsi: String,
    harga: Number 
});

export default model("avenue",avenueSchema);