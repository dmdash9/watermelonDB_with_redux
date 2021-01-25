import database from '@database/DatabaseInstance'
import { WorkpackModel } from '@database/workpack/workpacks.watermelon'

export default async function () {
  const workpacks = database.collections.get<WorkpackModel>('workpacks')

  // NOTE: things to improve:
  // Promise.all not to wait;
  // Fetch not all items at once;
  // Smartly decide how many data needs to be put to Redux store
  const results = await workpacks.query().fetch()
  const count = await workpacks.query().fetchCount()

  return {
    workpack: {
      count,
      results: results.map(v => {
        return {
          id: v.id,
          uuid: v.uuid,
          clientUuid: v.clientUuid,
          startDate: v.startDate,
          endDate: v.endDate,
          name: v.name,
          companyName: v.companyName,
          duct100Count: v.duct100Count,
          auditDueDate: v.auditDueDate,
          fulfilmentDueDate: v.fulfilmentDueDate
        }
      })
    }
  }
}
