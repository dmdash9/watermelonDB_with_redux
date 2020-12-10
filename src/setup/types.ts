export interface IWorkpack {
  uuid: string,
  clientUuid: string,
  name: string,
  companyName: string | null,
  startDate: string | null,
  endDate: string | null,
  duct100Count: number,
  auditDueDate: string | null,
  fulfilmentDueDate: string | null
}
