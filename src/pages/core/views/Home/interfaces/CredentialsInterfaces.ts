export interface Credentials {
    id: number
    user: string
    password: string
    description: string
    sub_category_id: number
    created_at: string
    updated_at: string
    additional_information: AdditionalInformation[]
  }
  
  export interface AdditionalInformation {
    id: number
    title: string
    values: string
    created_at: string
    updated_at: string
    credential_id: number
  }
  