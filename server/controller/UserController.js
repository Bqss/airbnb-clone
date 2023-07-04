import UserModel from "./../models/UserModel.js"

class UserController {

    static async getUserById(req, res){
        let status, message, data = {}, kode;
        const {id} = req.params;
        
        try {
            const user = await UserModel.findById(id);
            kode = 200;
            message = "success get user by id";
            status = "success";
            data = user;
            if(!user) {
                kode = 404;
                message = "user not found";
                status = "error";
                return ;
            }

        } catch (error) {
            kode = 500;
            message = 'server error';
            status = "error";
        }finally{
            res.status(kode).send({
                status, message, data
            })
        }
    }

    static async getAllUser(req, res){
        let kode, status, message, data = {};
        try {
            const user = await UserModel.find();
            kode = 200;
            message = "success get all user";
            status = "success";
            data = user;
        } catch (error) {
            kode = 500;
            message = 'server error';
            status = "error";
        }finally{
            res.status(kode).send({
                status, message, data
            })
        }
        
    }

    static async deleteUser(req, res){
        let kode, status, message, data = {};
        const {id} = req.params;
        try {
            const user = await UserModel.deleteOne({_id: id});
            kode = 200;
            message = "success delete user";
            status = "success";
        } catch (error) {
            kode = 500;
            message = 'server error';
            status = "error";
        }finally{
            res.status(kode).send({
                status, message, data
            })
        }
    }
}

export default UserController