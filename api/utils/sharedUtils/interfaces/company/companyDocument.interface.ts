import type { BaseDocument } from '../shared'

export interface CompanyCreationObject {
  dialCode: string
  email: string
  iso2: string
  name: string
  password: string
  phone: string
  registrationRequestId: string
  salt: string | null
  secretKey: string | null
}

export interface PasswordRecoveryConfig {
  secretKey: string
  requestDate: string
}

export interface CompanyDocument extends BaseDocument, CompanyCreationObject {
  passwordRecoveryConfig?: PasswordRecoveryConfig
}
