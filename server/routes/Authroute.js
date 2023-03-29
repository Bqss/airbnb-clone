import { Router} from "express";
import AuthController from "./../controller/AuthController"

const authRoute = Router();

authRoute.post("/register", AuthController);
authRoute.post("/login", AuthController.register);
authRoute.post("/logout", AuthController.logout);



export default authRoute;
