export * from './AddCompanyUser.interface'
export * from './company.interface'
export * from './companyDocument.interface'
export * from './companyUserCreation.interface'
export * from './loginCompany.interface'
export * from './loginCompanyRequest.interface'
export * from './password-reset'

export interface PasswordResetBody {
  id: string
  newPassword: string
  secretKey: string
}
