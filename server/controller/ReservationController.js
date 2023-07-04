import ReservationModel, { reservationSchema } from "./../models/ReservationModel.js";

class ReservationController {
  static async newReservation(req, res) {
    let status, message, data = {}, kode;
    const { userId, listingId, startDate, ownerId ,  endDate, totalprice } = req.body;
    try {
      await ReservationModel.create({
        userId,
        listingId,
        startDate,
        ownerId,
        endDate,
        totalprice,
      });
      kode = 201;
      message = "success create reservation";
      status = "success";
    } catch (err) {
        kode = 500;
        status = "error";
        message = "server error";
    }finally{
        res.status(kode).send({
            status, message, data
        })
    }
  }

  static async getReservations(req, res){
    const {userId, listingId, ownerId} = req.query;
    let status, message, data = {}, kode;
    const query = {};

    if(userId) query.userId = userId;
    if(listingId) query.listingId = listingId;
    if(ownerId) query.ownerId = ownerId;

    try{
        const reservations = await ReservationModel.find({
            ...query
        });
        kode = 200;
        message = "success get all reservations";
        status = "success";
        data = reservations;

    
    }catch(err){
        kode = 500;
        message = "server error";
        status = "error";
    }finally{
        res.status(kode).send({
            status, message, data
        })
    }
  }

  static async deleteAllReservation(req, res){
    try {
        await ReservationModel.deleteMany();
        res.status(200).json({ 
            status : "success",
            message : "Success delete all reservations"
        })
    } catch (error) {
        res.status(500).json({
            status : "error",
            message: error.message
        });
    }
  }

  static async deleteReservationById(req, res){
    const {reservationId} = req.params;
    let status, message, data = {}, kode;

    if(!reservationId){
        status = "failed";
        kode = 403;
        message = "ID is empty";
        return 
    }

    try {
        await ReservationModel.deleteMany({
            _id :reservationId
        });

        status = "success";
        message = "success delete reservation";
        kode = 200;
    } catch (error) {
        status = "error";
        kode = 500;
        message = "server error";
    }finally{
        res.status(kode).send({
            status, message, data
        })
    }
  }
}

export default ReservationController;
