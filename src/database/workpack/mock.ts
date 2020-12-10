let seed = 1
const template = {
  uuid: '1',
  clientUuid: '1',
  name: 'Mr Will',
  companyName: 'Pickr',
  startDate: '07/12/2020',
  endDate: '12/12/2020',
  duct100Count: 10,
  auditDueDate: '15/12/2020',
  fulfilmentDueDate: '20/12/2020'
}

export function createItemFromMock () {
  console.log('seed - ', seed)
  const newWorkpack = {
    ...template,
    uuid: seed.toString(),
    clientUuid: seed.toString(),
    name: `${template.name}_${seed}`
  }
  seed += 1
  return newWorkpack
}