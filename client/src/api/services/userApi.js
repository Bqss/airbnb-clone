import axios from "axios";
import { AxiosInstance } from "./axiosInstances";

class UserApi {
    static async login({email, password}){
        const result = await AxiosInstance.post("auth/login",{
            email,
            password
        });
        
        return result.data;
    }

    static async register({username, email, password}){
       const result = await AxiosInstance.post("auth/register",{
            username,
            email,
            password
        });
        return result.data;
    }

    static async getUserById({id}){
        const result = await AxiosInstance.get(`auth/user/${id}`);
        return result.data;
    }

    static async getCurrentUser(){
        const user = await AxiosInstance.get("auth/user/me");
        return user.data;
    }
}


export default UserApi;