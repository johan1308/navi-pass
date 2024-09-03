import { movilPayAPI } from "../api/movilPayAPI"

export const Logout=()=>{
    return movilPayAPI.get('/logout/')
}