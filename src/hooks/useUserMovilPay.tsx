import { useMemo } from "react";
import { getCookie } from "../config/cookies";

interface Root {
  id: number
  name: string
  lastname: string
  identification: string
  phone: any
  email: string
  is_active: boolean
  permissions: any
  groups: string[]
  menus: any[]
}

export const useUserMovilPay = ():Root => {
  const data = useMemo(() => {
    const local = JSON.parse(getCookie('user'))  ?? "{}"
    
    
    
    return local;
  }, []);
  return data
};



