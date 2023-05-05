import AvenueModel from "./../models/AvenueModel.js";
import UserModel from "./../models/UserModel.js";

class AvenueController {
  static async newAvenue(req, res) {
    const {
      available,
      alamat,
      harga,
      deskripsi,
      judul,
      fasilitas,
      ownerId,
      infoDasar,
      foto,
      kategori,
    } = req.body;

    if (
      available &&
      foto &&
      alamat &&
      harga &&
      deskripsi &&
      judul &&
      ownerId &&
      fasilitas &&
      infoDasar &&
      kategori
    ) {
      try {
        await AvenueModel.create({
          available,
          kategori,
          alamat,
          harga,
          deskripsi,
          judul,
          ownerId,
          fasilitas,
          informasiDasar: infoDasar,
          foto,
        });
        res.sendStatus(201);
      } catch (error) {
        console.log(error)
        res.sendStatus(500);
      }
      return;
    }
    return res.sendStatus(400);
  }

  static async getAvenueById(req, res) {
    const { aid } = req.params;
    if (aid) {
      try {
        const avenue = await AvenueModel.findById(aid);
        if (!avenue) {
          return res.status(404).json({
            status: "error",
            message: "Avenue not found",
          });
        }

        const userData = await UserModel.findById(avenue.ownerId);

        return res.status(200).json({
          status: "success",
          message: "Avenue found",
          data: {...avenue._doc, ownerProfilePicture : userData.profilePicture, ownerUsername:userData.username},
        });
        
      } catch (error) {
        return res.status(500).send({
          status: "error",
          message: "Internal Server Error",
          data: error,
        });
      }
    }

    return res.status(400).send({
      status: "error",
      message: "Bad Request",
    });
  }

  static async getAllAvenue(req, res) {
    try {
      const avenue = await AvenueModel.find();

      return res.status(200).json({
        status: "success",
        message: "Avenue found",
        data: avenue,
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "Internal Server Error",
        data: error,
      });
    }
  }

  static async deleteAvenue(req, res) {
    const { aid } = req.params;
    try {
      await AvenueModel.findByIdAndDelete(aid);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  }
}

export default AvenueController;
