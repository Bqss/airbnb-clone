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
    ownerId,
    judul,
    fasilitas,
    infoDasar,
  }) {
    try {
      const result = await AxiosInstance.post(
        "/avenues",
        {
          kategori,
          alamat,
          foto,
          available,
          harga,
          deskripsi,
          judul,
          fasilitas,
          ownerId,
          infoDasar,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return result.data;
    } catch (err) {
      return err;
    }
  }

  static async getAvenueById({ avenueId }) {
    const result = await AxiosInstance.get(`/avenues/${avenueId}`);
    return result.data.data;
  }

  static async getAvenues({ownerId}){
    const result = await AxiosInstance.get(`/avenues${ownerId ? "?ownerId="+ownerId  : ''}`)
    return result.data.data;
  }
}

export default AvenueApi;
