import ReservationModel from "./../models/ReservationModel.js";

class ReservationController {
  static async newReservation(req, res) {
    const { userId, listingId, startDate, endDate, totalprice } = req.body;
    try {
      await ReservationModel.create({
        userId,
        listingId,
        startDate,
        endDate,
        totalprice,
      });
      res.status(201).json({ status: "success", message: "Reservation created successfully" });
    } catch (err) {
      res.status(500).json({ status : "error",message: err.message });
    }
  }
  static async getReservationsById(req, res) {
    const { id } = req.params;
    try {
      const result = await ReservationModel.find({
        listingId : id
      });

      res.status(200).json({
        status : "success",
        message : "Request succes",
        data : result
      })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error
        })
    }
  }

  static async getAllReservations(req, res){
    try {
        const result = await ReservationModel.find();
        res.status(200).json({
            status: "success",
            message : "Success get all reservations",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status : "failed",
            message : error.message
        })
    }
  }
}

export default ReservationController;
