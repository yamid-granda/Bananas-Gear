import type { COMPANY_COUNTS } from '../config'

export type CompanyCount = 'users'

export type CompanyCountsDic = Record<CompanyCount, number>

export type CompanyCounts = typeof COMPANY_COUNTS | []

