import { makeQuery } from '../utilities/connection'
import {
  createWorkpackQuery,
  updateWorkpackQuery,
  deleteWorkpackQuery,
  getLatestChangesQuery,
  applyChangesQuery
} from '../queries/workpacks'

export function createWorkpack (workpack) {
  const query = createWorkpackQuery(workpack)
  return makeQuery({ query, singleRes: true })
}

export function updateWorkpack (workpack) {
  const query = updateWorkpackQuery(workpack)
  return makeQuery({ query, singleRes: true })
}

export function deleteWorkpack (uuid) {
  const query = deleteWorkpackQuery(uuid)
  return makeQuery({ query, singleRes: true })
}

export function getLatestChanges (clientUuid, lastPulledAt) {
  const query = getLatestChangesQuery(clientUuid, lastPulledAt)
  return makeQuery({ query })
}

// { changes, timestamp }
export function applyChanges (changes, lastPulledAt) {
  const query = applyChangesQuery(changes, lastPulledAt)
  // return query
  return makeQuery({ query })
}
