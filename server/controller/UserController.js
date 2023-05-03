import UserModel from "../models/UserModel"

class UserController {
    async getUserById(req, res){
        const {id}= req.params;
        try {
            const user = await UserModel.findById(id);
            res.status(200)
        } catch (error) {
            
        }
    }

    async getAllUser(req, res){

    }

    async deleteUser(req, res){

    }
}