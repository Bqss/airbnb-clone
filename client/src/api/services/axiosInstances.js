import axios from "axios";

export  const AxiosInstance = axios.create({
    baseURL : "http://localhost:4000/api/",
    withCredentials : true
})