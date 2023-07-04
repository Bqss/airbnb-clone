import { Router } from "express";
import AvenueController from "./../controller/AvenueController.js";

export const avenueRoute = Router();

avenueRoute.post('/',AvenueController.newAvenue);
avenueRoute.get('/',AvenueController.getAvenues);
avenueRoute.get('/:avenueId',AvenueController.getAvenueById);
avenueRoute.delete('/:aid',AvenueController.deleteAvenue);
avenueRoute.post('/:aid/favorite',AvenueController.addFavorite);
avenueRoute.delete('/:aid/favorite/:userId',AvenueController.removeFavorite);
avenueRoute.get("/favourites/:userId", AvenueController.getAllFavourites);