export interface Payment {
    id: number
    amount: string
    date: string
    description: string
    mobile: string
    reference: string
    sender: any
    status: boolean
    company: number
    company_name: string
    bank_origin: number
    bank_origin_name: string
    bank_destiny: number
    bank_destiny_name: string
    method: number
    method_name: string
    updated_at: string
  }
  


  export interface MethodPayment {
    id: number
    currency: string
    name: string
    status: number
    status_name: string
  }
  