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
        console.log(error);
        res.sendStatus(500);
      }
      return;
    }
    return res.sendStatus(400);
  }

  static async getAvenueById(req, res) {
    const { avenueId } = req.params;

    try {
        const result = await AvenueModel.findById(avenueId);
        if(!result){
            return res.status(404).send({
                status: "error",
                message: "Avenue not found",
            });
        }

        const userData = await UserModel.findById(result.ownerId);

         res.status(200).json({
            status: "success",
            message: "Avenue found",
            data: {
              ...result._doc,
              ownerProfilePicture: userData.profilePicture,
              ownerUsername: userData.username,
            },
          });
        
    } catch (error) {
         res.status(500).send({
            status: "error",
            message: error.message,
 
          });
    }
  }

  static async getAvenues(req, res) {
    const { ownerId , page , limit } = req.query;
    const query = {};
    let result = {};
    
    if (ownerId) query.ownerId = ownerId;

    try {
      let avenues ;
      const count = await AvenueModel.countDocuments({...query});
      if(page && limit){
        avenues = await AvenueModel.find({...query}).skip(page * limit).limit(limit);
        if(page < Math.ceil(count/limit)-1){
            result.next = {
                page: Number(page) + 1,
                limit : Number(limit),
            }
        }
      }else{
        avenues = await AvenueModel.find({
            ...query
          });
      }

      
      return res.status(200).json({
        status: "success",
        message: "Avenue found",
        data: avenues,
        ...result
      });
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: error.message,
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
