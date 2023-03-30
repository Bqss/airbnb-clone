import UserModel from "./../models/UserModel";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();
const {env} = process; 

class AuthController {
  static async register(req, res) {
    const { name, email, password } = req.body;
    const bcryptSalt = bcrypt.genSaltSync(10);
    try {
      const userDoc = await UserModel.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.status(201).json(userDoc);
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
          env.jwtSecret
        );
        res
          .cookie("ab_t", token, {
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

  static async logout(req, res) {}
}


export default AuthController;
