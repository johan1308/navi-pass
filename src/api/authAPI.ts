import axios from "axios";


export const authApi = axios.create({
    //baseURL: 'https://validator.movilpay.app',
    baseURL: 'http://38.45.34.27/api/v1',
    
})