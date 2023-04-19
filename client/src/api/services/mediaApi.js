import { AxiosInstance } from "./axiosInstances";

class MediaApi {
  static async uploadImage(media) {
    try {
      const result = await AxiosInstance.post(`/media`, {
        media,
      });
      return result.data;
    } catch (error) {
      return result.error;
    }
  }
}

export default MediaApi;
