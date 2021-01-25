import { Model, tableSchema } from '@nozbe/watermelondb'
import { field } from '@nozbe/watermelondb/decorators'
import { workpacksTableName, WorkpackColumns } from './workpacks.meta'

export const workpacksSchema = tableSchema({
  name: workpacksTableName,
  columns: [
    { name: WorkpackColumns.Uuid, type: 'string', isOptional: true },
    { name: WorkpackColumns.ClientUuid, type: 'string', isOptional: true },
    { name: WorkpackColumns.Name, type: 'string' },
    { name: WorkpackColumns.CompanyName, type: 'string', isOptional: true },
    { name: WorkpackColumns.StartDate, type: 'string', isOptional: true },
    { name: WorkpackColumns.EndDate, type: 'string', isOptional: true },
    { name: WorkpackColumns.Duct100Count, type: 'number' },
    { name: WorkpackColumns.AuditDueDate, type: 'string', isOptional: true },
    { name: WorkpackColumns.FulfilmentDueDate, type: 'string', isOptional: true }
  ]
})

export class WorkpackModel extends Model {
  static table = workpacksTableName

  @field(WorkpackColumns.Uuid) uuid // string | null
  @field(WorkpackColumns.ClientUuid) clientUuid // string
  @field(WorkpackColumns.Name) name // string
  @field(WorkpackColumns.CompanyName) companyName // string | null
  @field(WorkpackColumns.StartDate) startDate // string | null
  @field(WorkpackColumns.EndDate) endDate // string | null
  @field(WorkpackColumns.Duct100Count) duct100Count // number
  @field(WorkpackColumns.AuditDueDate) auditDueDate // string | null
  @field(WorkpackColumns.FulfilmentDueDate) fulfilmentDueDate // string | null
}
