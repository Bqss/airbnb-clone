import {Router} from "express";
import ReservationController from "./../controller/ReservationController.js";

const reservationRoute = Router();

reservationRoute.post("/", ReservationController.newReservation);
reservationRoute.get("/:id", ReservationController.getReservationsById);
reservationRoute.get("/", ReservationController.getAllReservations);

export default reservationRoute;
