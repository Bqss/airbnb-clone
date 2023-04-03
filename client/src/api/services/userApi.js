import axios from "axios";
import { AxiosInstance } from "./axiosInstances";

class UserApi {
    static async login({userName, password}){
        const result = await AxiosInstance.post("auth/login",{
            userName,
            password
        });
        
        return result.data;
    }

    static async register({userName, email, password}){
       const result = await AxiosInstance.post("auth/register",{
            userName,
            email,
            password
        });
        return result.data;
    }

    static async getUserById({id}){
        const result = await AxiosInstance.get(`auth/user/${id}`);
        return result.data;
    }
}


export default UserApi;