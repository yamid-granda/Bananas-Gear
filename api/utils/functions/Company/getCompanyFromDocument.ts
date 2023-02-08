import type { Company, CompanyDocument } from '../../'

export function getCompanyFromDocument(document: CompanyDocument): Company {
  return {
    id: document.id,
    name: document.name,
    email: document.email,
    createdAt: document.createdAt,
  }
}
