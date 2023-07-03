import ReservationModel, { reservationSchema } from "./../models/ReservationModel.js";

class ReservationController {
  static async newReservation(req, res) {
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
      res.status(201).json({ status: "success", message: "Reservation created successfully" });
    } catch (err) {
      res.status(500).json({ status : "error",message: err.message });
    }
  }

  static async getReservations(req, res){
    const {userId, listingId, ownerId} = req.query;
    const query = {};

    if(userId) query.userId = userId;
    if(listingId) query.listingId = listingId;
    if(ownerId) query.ownerId = ownerId;

    try{
        const reservations = await ReservationModel.find({
            ...query
        });

        res.status(200).json({
            status : "success",
            message : "Success get all reservations",
            data : reservations
        });
    }catch(err){
        res.status(500).json({
            status : "error",
            message : err.message
        }) ;
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

    if(!reservationId){
        return res.status(403).send({
            status : "failed",
            message : "ID is empty"
        })
    }

    try {
        await ReservationModel.deleteMany({
            _id :reservationId
        });

        res.status(200).send({
            status : "success",
            message: "success delete reservation"
        });
    } catch (error) {
        res.status(500).send({
            status : "failed",
            message: error.message
        })
    }
  }
}

export default ReservationController;
