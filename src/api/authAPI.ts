import axios from "axios";


export const authApi = axios.create({
    
    baseURL: 'http://38.45.34.27/api/v1',
    
})