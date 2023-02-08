import type { BaseCompanyRegisterRequest, BaseDocument } from '..'

export interface CompanyRegisterRequestCreationObject extends BaseCompanyRegisterRequest {
  secretKey: string
  password: string
}

export interface CompanyRegisterRequestDocument
  extends BaseDocument,
  CompanyRegisterRequestCreationObject {}
