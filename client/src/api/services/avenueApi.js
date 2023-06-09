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

  static async getAvenues({ ownerId="", page=0, limit=12, category="" }) {
    const query = new URLSearchParams({ page, limit, ownerId, category});
    const result = await AxiosInstance.get(
      `/avenues?${query.toString()}`
    );
    return result.data;
  }

  static async deleteAvenueById({ avenueId }) {
    const result = await AxiosInstance.delete(`/avenues/${avenueId}`);
    return result.data;
  }

  static async addToFavorite({ avenueId, userId }) {
    const result = await AxiosInstance.post(`/avenues/${avenueId}/favorite`, {
      userId,
    });
    return result.data;
  }
  static async removeFromFavorite({ avenueId, userId }) {
    const result = await AxiosInstance.delete(`/avenues/${avenueId}/favorite/${userId}`);
    return result.data;
  }
}

export default AvenueApi;
