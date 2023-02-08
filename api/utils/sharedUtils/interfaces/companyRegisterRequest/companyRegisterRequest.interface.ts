import type { BaseDocument } from '..'

export interface BaseCompanyRegisterRequest {
  name: string
  email: string
  status: 'emailValidationPending' | 'created'
  validationAttempts: number
  phone?: string
  greaterNeed?: string
  iso2?: string
  dialCode?: string
  businessSector?: string
  ideas?: string
}

export interface CompanyRegisterRequest extends BaseDocument, BaseCompanyRegisterRequest {}
