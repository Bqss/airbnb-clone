import {Router} from "express";
import UserController from "./../controller/UserController.js";

export const userRoute = Router();

userRoute.get(`/:id`, UserController.getUserById)
userRoute.delete(`/:id`, UserController.deleteUser)
userRoute.get(`/`, UserController.getAllUser)
