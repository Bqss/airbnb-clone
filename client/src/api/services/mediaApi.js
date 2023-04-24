import { Axios } from "axios";
import { AxiosInstance } from "./axiosInstances";

export const signal= new AbortController();

class MediaApi {
  static async uploadImage({media, controller}) {

    try {
      const result = await AxiosInstance.post(`media`, {
        media,
      },
      {
        signal : controller.signal
      });
      return result.data;
    } catch (error) {
      return error;
    }
  }

  static async deleteImage({pid}){
    try {
        const result = await AxiosInstance.delete(`media/${pid}`);
        return result.data;
    } catch (error) {
        return error;
    }
  }
}

export default MediaApi;
