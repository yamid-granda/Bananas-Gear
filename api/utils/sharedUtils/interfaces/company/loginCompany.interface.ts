import type { Auth, Company } from '..'

export interface LoginCompany extends Auth {
  company: Company
}
