export interface RegisterCompanyRequest {
  email: string
  name: string
  password: string
  phone?: string
  greaterNeed?: string
  businessSector?: string
  iso2?: string
  dialCode?: string
}
