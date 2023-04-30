import axios from "axios";
import { AxiosInstance } from "./axiosInstances";


class AvenueApi {
  static async newAvenue({
    kategori,
    available,
    foto,
    alamat,
    harga,
    deskripsi,
    judul,
    fasilitas,
    infoDasar,

  }) {
    try{
        const result = await AxiosInstance.post("/avenue",{
            kategori,
            alamat,
            foto,
            available,
            harga,
            deskripsi,
            judul,
            fasilitas,
            infoDasar
        },{
            headers:{
                "Content-Type" : "application/json"
            }
        })

        return result.data;
    }catch(err){
        return err;
    }
  }
}


export default AvenueApi
