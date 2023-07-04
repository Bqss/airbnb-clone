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
        let status, message, data = {}, kode;
        try {
            await UserModel.create({
                username,
                email,
                password: bcrypt.hashSync(password, bcryptSalt),
            });
            kode = 200;
            status = "success";
            message = "register success";
        } catch (err) {
            kode = 500;
            status = "failed";
            message = err.message;
        } finally {
            res.status(kode).status(kode).send({
                status, message, data
            })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        const userDoc = await UserModel.findOne({ email });
        let status, message, data = {}, kode;

        try {
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
                    res.cookie("airBnbClone_token", token, {
                        maxAge: 1000 * 60 * 60 * 10,
                        httpOnly: true,
                    })
                    kode = 200;
                    status = "success";
                    message = "login success";

                } else {
                    status = "failed";
                    kode = 400;
                    message = "Wrong Password";
                }
            } else {
                kode = 404;
                status = "failed";
                message = "User not found";
            }
        } catch (err) {
            kode = 500;
            status = "failed";
            message = err.message;
        } finally {
            res.status(kode).send({
                status, message, data
            })
        }


    }

    static async getCurrentUser(req, res) {
        const { airBnbClone_token } = req.cookies;
        let kode, status, message, data = {};

        if (!airBnbClone_token) {
            kode = 401;
            status = "failed";
            message = "Unauthorized, token is missing";
            return;
        }

        try {
            const decoded = jwt.verify(airBnbClone_token, env.JWT_SECRET);

            try {
                kode = 200;
                status = "success";
            } catch (error) {
                kode = 500;
                status = "failed";
                message = "server error";
            }
        } catch (error) {
            kode = 401;
            status = "failed";
            message = "Unauthorized, token is expired or invalid";
            res.clearCookie("airBnbClone_token");
        }finally{
            res.status(kode).send({
                status, message, data,
            })
        }
    }

    static async logout(res) {
        let status, message, data = {}, kode;
        try {
            res.clearCookie("airBnbClone_token");
            kode = 200;
            status = "success";
            message = "logout success";
     
        } catch (error) {
            kode = 500;
            status = "failed";
            message = "server error";
        }finally{
            res.status(kode).send({
                status, message, data
            })
        }
    }
}

export default AuthController;
