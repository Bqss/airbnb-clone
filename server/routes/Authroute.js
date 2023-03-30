import { Router} from "express";
import AuthController from "./../controller/AuthController"

const authRoute = Router();

authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);
authRoute.post("/logout", AuthController.logout);



export default authRoute;
