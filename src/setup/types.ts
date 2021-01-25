export interface IWorkpack {
  id: string,
  uuid: string | null,
  clientUuid: string | null,
  name: string,
  companyName: string | null,
  startDate: string | null,
  endDate: string | null,
  duct100Count: number,
  auditDueDate: string | null,
  fulfilmentDueDate: string | null
}
