// Array<RowDataPacket>, where first is always timestamp and the rest are rows of any specific table
export function createChangesPayload (results, table) {
  if (!results || results.length < 2) {
    return null
  }
  return {
    timestamp: getSQLQueryResults(results[0])[0]['@nowTimestamp'],
    changes: mapQueryResultsToChanges(getSQLQueryResults(results[1]), table)
  }
}

function mapQueryResultsToChanges (results, table) {
  return results.reduce((acc, curr) => {
    console.log(curr, curr.created_at === curr.updated_at)
    if (curr.is_deleted) {
      acc[table].deleted.push(curr.uuid)
    } else if (curr.created_at === curr.updated_at) {
      acc[table].created.push(trimFieldsFromItem(curr))
    } else {
      acc[table].updated.push(trimFieldsFromItem(curr))
    }
    return acc
  }, {
    [table]: {
      deleted: [],
      created: [],
      updated: []
    }
  })
}

function trimFieldsFromItem (item) {
  const clone = { ...item }
  clone.id = clone.uuid
  delete clone.is_deleted
  delete clone.updated_at
  delete clone.created_at
  return clone
}

function getSQLQueryResults (result) {
  return JSON.parse(JSON.stringify(result))
}
