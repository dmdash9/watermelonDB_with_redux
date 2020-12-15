import mysql from 'mysql'

const DATE_FORMAT = '%Y-%m-%dT%H:%i:%s.%fZ' // '%d/%m/%Y' // '%d/%m/%Y %H:%i:%s'

// NOTE: Create or update is forced by the sync rules not to lose the track of the item as
// This happens if previous push succeeded on the backend, but not on frontend

export const createWorkpackQuery = (workpack) => (
`
SET @nowTimestamp = UNIX_TIMESTAMP();

${createWorkpackQueryBody(workpack)}
`
)

const createWorkpackQueryBody = (workpack) => (
  `
INSERT INTO pickr.workpacks(uuid, client_uuid, name, company_name, start_date, end_date, duct_100_count, audit_due_date, fulfilment_due_date, updated_at, created_at, is_deleted)
VALUES (
  ${workpack.uuid},
  ${workpack.client_uuid},
  ${mysql.escape(workpack.name)},
  ${mysql.escape(workpack.company_name)},
  STR_TO_DATE(${mysql.escape(workpack.start_date)}, ${mysql.escape(DATE_FORMAT)}),
  STR_TO_DATE(${mysql.escape(workpack.end_date)}, ${mysql.escape(DATE_FORMAT)}),
  ${workpack.duct_100_count},
  STR_TO_DATE(${mysql.escape(workpack.audit_due_date)}, ${mysql.escape(DATE_FORMAT)}),
  STR_TO_DATE(${mysql.escape(workpack.fulfilment_due_date)}, ${mysql.escape(DATE_FORMAT)}),
  @nowTimestamp,
  @nowTimestamp,
  0) ON DUPLICATE KEY UPDATE
  name = ${mysql.escape(workpack.name)},
  company_name = ${mysql.escape(workpack.company_name)},
  start_date = STR_TO_DATE(${mysql.escape(workpack.start_date)},${mysql.escape(DATE_FORMAT)}),
  end_date = STR_TO_DATE(${mysql.escape(workpack.end_date)},${mysql.escape(DATE_FORMAT)}),
  duct_100_count = ${workpack.duct_100_count},
  audit_due_date = STR_TO_DATE(${mysql.escape(workpack.audit_due_date)},${mysql.escape(DATE_FORMAT)}),
  fulfilment_due_date = STR_TO_DATE(${mysql.escape(workpack.fulfilment_due_date)},${mysql.escape(DATE_FORMAT)}),
  updated_at = @nowTimestamp;
`
)

export const updateWorkpackQuery = (workpack) => (
`
UPDATE pickr.workpacks SET

name = ${mysql.escape(workpack.name)},
company_name = ${mysql.escape(workpack.company_name)},
start_date = STR_TO_DATE(${mysql.escape(workpack.start_date)},${mysql.escape(DATE_FORMAT)}),
end_date = STR_TO_DATE(${mysql.escape(workpack.end_date)},${mysql.escape(DATE_FORMAT)}),
duct_100_count = ${workpack.duct_100_count},
audit_due_date = STR_TO_DATE(${mysql.escape(workpack.audit_due_date)},${mysql.escape(DATE_FORMAT)}),
fulfilment_due_date = STR_TO_DATE(${mysql.escape(workpack.fulfilment_due_date)},${mysql.escape(DATE_FORMAT)}),
updated_at = UNIX_TIMESTAMP()

WHERE uuid = ${workpack.uuid};
`
)

export const deleteWorkpackQuery = (uuid) => (
`
UPDATE pickr.workpacks SET

updated_at = UNIX_TIMESTAMP(),
is_deleted = 1

WHERE uuid = ${uuid};
`
)

// NOTE: working with last_pulled_at on DB level is incorrect as the pull might fail on cliend side.
// Observe how client sync works and then FIX
export const getLatestChangesQuery = (clientUuid, lastPulledAt) => (
`
SET AUTOCOMMIT=0;
BEGIN;

SET @nowTimestamp = UNIX_TIMESTAMP();

SELECT @nowTimestamp;

SELECT uuid, client_uuid, name, company_name, start_date, end_date, duct_100_count, audit_due_date, fulfilment_due_date, updated_at, created_at, is_deleted FROM pickr.workpacks
WHERE client_uuid = ${clientUuid} AND updated_at > ${lastPulledAt || 0};

COMMIT;
`
)

/*
NOTE: we do not use client-side lastPulledAt mark for now because:
- we might implement it another way (keeing track of errored-not-synced items to pull only them later)
- this might be not the real case or a trivial one for us so we might avoid these extra checks

If the changes object contains a record that has been modified on the server after lastPulledAt, you MUST abort push and return an error code
This scenario means that there's a conflict, and record was updated remotely between user's pull and push calls. Returning an error forces frontend to call pull endpoint again to resolve the conflict

NOTE: we have only workpacks in the example and all the namings are made in accordance. So, not to refactor to make it generic it works only for workpacks
 */
export function applyChangesQuery (changes, lastPulledAt) {
  const transaction = `
SET AUTOCOMMIT=0;
BEGIN;

SET @nowTimestamp = UNIX_TIMESTAMP();

${(() => {
    // we have only workpacks table
    const commands = []
    for (const table of Object.values(changes)) {
      for (const id of table.deleted) {
        commands.push(deleteWorkpackQuery(id))
      }
      for (const wp of table.created) {
        commands.push(createWorkpackQueryBody(wp))
      }
      for (const wp of table.updated) {
        commands.push(updateWorkpackQuery(wp))
      }
    }
    return commands.join('\n')
  })()}

COMMIT;
`

  return transaction
}
