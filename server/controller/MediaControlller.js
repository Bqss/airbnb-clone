import cloudinary from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const { env } = process;

cloudinary.v2.config({
  secure: true,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
});

class MediaController {
  static async uploadImage(req, res) {
    const media = req.files.media;

    try {
        await media.mv(`./tmp/-${media.name}`);
        const option = {
          use_filename: true,
          unique_filename: false,
        };
        const mediaPath = `.\\tmp\\-${media.name}`;
        const result = await cloudinary.v2.uploader.upload(mediaPath, option);
      
      res.status(200).send(result);
    } catch (err) {

      res.sendStatus(500);
    }
  }

  static async deleteImage(req, res) {
    const {pid} = req.params;

    try {
        await cloudinary.v2.api.delete_resources(pid);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
    }
  }
}

export default MediaController;
