let seed = 1
const template = {
  id: '1',
  uuid: null,
  clientUuid: null,
  name: 'Mr Will',
  companyName: 'Pickr',
  startDate: '2020-12-07T00:00:00.000Z',
  endDate: '2020-12-07T00:00:00.000Z',
  duct100Count: 10,
  auditDueDate: '2020-12-07T00:00:00.000Z',
  fulfilmentDueDate: '2020-12-07T00:00:00.000Z'
}

export function createItemFromMock() {
  const newWorkpack = {
    ...template,
    // uuid: seed.toString(),
    // clientUuid: seed.toString(),
    name: `${template.name}_${seed}`
  }
  seed += 1
  return newWorkpack
}