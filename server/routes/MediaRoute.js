import express from "express";
import MediaController from "./../controller/MediaControlller.js";

export const mediaRoute = express.Router();

mediaRoute.post(`/`,MediaController.uploadImage);
mediaRoute.delete(`/:pid`,MediaController.uploadImage);