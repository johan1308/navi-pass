export interface Dashboard  {
  company: string
  company_id: string
  year: string
  month: string
  payment_method: string
  payment_method_id: string
  currency: string
  bank: string
  bank_id: string
  quantity: number
  quantity_unassociated_transactions: number
  quantity_validated_transactions: number
  total: number
  total_usd: number
  total_usd_in_bs: number
  total_bs: number
  total_bs_in_usd: number
  total_in_bs: number
  total_in_usd: number
}
