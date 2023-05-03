import { Router} from "express";
import AuthController from "./../controller/AuthController.js"

const authRoute = Router();

authRoute.post("/register", AuthController.register);
authRoute.post("/login", AuthController.login);
authRoute.post("/logout", AuthController.logout);
authRoute.get("/crntuser", AuthController.getCurrentUser);




export default authRoute;
