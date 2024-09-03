import { deleteCookie } from "../config/cookies";


export const configLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    deleteCookie("token")
    deleteCookie("user")
    deleteCookie("companyDash")
    window.location.href = "/auth/";
}
