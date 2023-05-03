import UserModel from "./../models/UserModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import  jwt  from "jsonwebtoken";

dotenv.config();
const {env} = process; 

class AuthController {
  static async register(req, res) {
    const { name, email, password } = req.body;
    const bcryptSalt = bcrypt.genSaltSync(10);
    try {
       await UserModel.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.sendStatus(201);
    } catch (e) {
      res.status(500).json("server error");
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const userDoc = await UserModel.findOne({ email });

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        const token = jwt.sign(
          { email: userDoc.email, id: userDoc._id },
          env.JWT_SECRET
        );
        res
          .cookie("airBnbClone_token", token, {
            maxAge: 1000 * 60 * 2,
            httpOnly: true,
          })
          .status(200)
          .json("berhasil login");
      }else{
        res.status(400).json("password salah")
      }
    } else {
      res.status(404).json("user not found");
    }
  }

  static async getCurrentUser ( req, res ) {
    
    const {airBnbClone_token} = req.cookies;

    console.log(airBnbClone_token);

    if(!airBnbClone_token) {
        res.status(401).send({});
    }

    try {

        try {
            const decoded = jwt.verify(airBnbClone_token, env.JWT_SECRET);
            res.send
        } catch (error) {
            res.status(401).send({});
        }
        const result = await UserModel.findById(userId);
        res.status(200).send(result.data);
    } catch (error) {
        res.sendStatus(500);
    }
  }

  static async logout(req, res) {}
}


export default AuthController;
