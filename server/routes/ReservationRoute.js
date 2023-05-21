import {Router} from "express";
import ReservationController from "./../controller/ReservationController.js";

const reservationRoute = Router();

reservationRoute.post("/", ReservationController.newReservation);
reservationRoute.get("/", ReservationController.getReservations);
reservationRoute.delete("/", ReservationController.deleteAllReservation);

export default reservationRoute;
