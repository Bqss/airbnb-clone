import UserModel from "./../models/UserModel.js"

class UserController {
    static async getUserById(req, res){
        const {id} = req.params;
        try {
            const user = await UserModel.findById(id);
            if(!user) return res.sendStatus(404)
            res.status(200).send(user);
        } catch (error) {
            res.sendStatus(500);
        }
    }

    static async getAllUser(req, res){
        try {
            const user = await UserModel.find();
            res.status(200).send(user)
        } catch (error) {
            res.sendStatus(500);
        }
    }

    static async deleteUser(req, res){
        const {id} = req.params;
        try {
            const user = await UserModel.deleteOne({_id: id});
            res.sendStatus(200);
        } catch (error) {
            res.sendStatus(500);
        }
    }
}

export default UserController