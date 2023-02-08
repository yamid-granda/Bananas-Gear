import type { BaseDocument } from '..'

export interface BaseCompany {
  name: string
  email: string
}

export interface Company extends BaseDocument, BaseCompany {}
