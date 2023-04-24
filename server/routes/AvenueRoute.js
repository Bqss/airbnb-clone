import { Router } from "express";
import AvenueController from "./../controller/AvenueController.js";

export const avenueRoute = Router();

avenueRoute.post('/',AvenueController.newAvenue);
avenueRoute.get('/',AvenueController.getAllAvenue);
avenueRoute.delete('/:aid',AvenueController.deleteAvenue);