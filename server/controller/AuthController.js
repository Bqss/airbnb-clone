import UserModel from "./../models/UserModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const { env } = process;

class AuthController {
  static async register(req, res) {
    const { username, email, password } = req.body;
    const bcryptSalt = bcrypt.genSaltSync(10);
    try {
      await UserModel.create({
        username,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.sendStatus(201);
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    const userDoc = await UserModel.findOne({ email });

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        const token = jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
            profilePicture: userDoc.profilePicture,
            username: userDoc.username,
          },
          env.JWT_SECRET
        );
        res
          .cookie("airBnbClone_token", token, {
            maxAge: 1000 * 60 * 60 * 10 ,
            httpOnly: true,
          })
          .status(200)
          .json("berhasil login");
      } else {
        res.status(400).json("password salah");
      }
    } else {
      res.status(404).json("user not found");
    }
  }

  static async getCurrentUser(req, res) {
    const { airBnbClone_token } = req.cookies;

    if (!airBnbClone_token) {
      return res.sendStatus(401);
    }

    try {
      const decoded = jwt.verify(airBnbClone_token, env.JWT_SECRET);

      try {
        return res.status(200).send(decoded);
      } catch (error) {
        return res.sendStatus(500);
      }
    } catch (error) {
      res.status(401).send({});
    }
  }

  static async logout(req, res) {
    try {
        res.clearCookie("airBnbClone_token");
        res.status(200).send({
            status : "succes",
            message : "logout success"
        }) 
    } catch (error) {
        res.status(500).send({
            status: "failed",
            message: "server error"
        })
    }
  }
}

export default AuthController;
