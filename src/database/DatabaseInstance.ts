import {
  appSchema,
  AppSchema,
  Database,
  DatabaseAdapter,
} from '@nozbe/watermelondb'

import { makeApiCall } from '@setup/apiClient'

import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import {
  workpacksSchema,
  WorkpackModel
} from './workpack/workpacks.watermelon'

import { synchronize, SyncPullArgs, SyncPullResult, SyncPushArgs } from '@nozbe/watermelondb/sync'

const schema: AppSchema = appSchema({
  version: 1,
  tables: [
    workpacksSchema
  ]
})

const adapter: DatabaseAdapter = new SQLiteAdapter({ schema })

// NOTE: I think that we need to patch database action and use it here with some logic of queueing actions while other related
// are in progress, or when sync is in progress. TO DISCUSS

const database = new Database({
  adapter,
  modelClasses: [
    WorkpackModel
  ],
  actionsEnabled: true
})

export async function resetDb() {
  return database.action(() => database.unsafeResetDatabase())
}

const log = {}
export async function dbSync(clientUuid) {
  // NOTE: we do not store last_pulled_at locally and do not send it
  // it is stored on the backend in the current implementation
  // and we do not use other arguments as well as that goes beyond basic example
  // so the args are commented

  // NOTE: it might folow do while (next) loop inside until we fetch all the batched data if there are lot's of chages.

  // NOTE: we'd like to add extra flags here controlling what has changed and what we want to pull. But this needs to be carefuly thought through
  // This way if other items were changed they would not be tracked as localDB timestamp would be bumped.
  // So, this might be used only if we know cases when the loss would never occur.

  // NOTE: we might get not synced items from auxiliary table and send those to backend to get them in pullChanges
  async function pullChanges(args: SyncPullArgs): Promise<SyncPullResult> {
    console.log('pullChanges args - ', args)
    const response = await makeApiCall(`sync?clientUuid=${clientUuid}&lastPulledAt=${args.lastPulledAt}`, null, { method: 'get' })
    console.log('pullChanges response - ', JSON.stringify(response, null, 4))
    if (response.error) {
      console.log(response.error)
      throw new Error(response.error)
    }
    return response
  }

  // NOTE: we might get not synced items as array of tables and ids and store that in separate auxiliary table
  // to send them later in pullChanges (and this also might be the signal to restart sync, but with lesser payloads now as we updated last_pulled_at)
  // in the end of push we need to update the table or errored sync items (remove old and add new if any)
  async function pushChanges(args: SyncPushArgs): Promise<void> {
    const { lastPulledAt, changes } = args
    console.log('pushChanges changes::: - ', JSON.stringify(changes, null, 4))
    const response = await makeApiCall(`sync?lastPulledAt=${lastPulledAt}`, changes, { method: 'post' })
    await wait(7000)
    console.log('WAITED_@@@')
    if (response.error) {
      throw new Error(response.error)
    }
  }


  // NOTE: we need retry policy
  // NOTE: we need a sync lock
  // NOTE: we might do some pre-sync work like getting all items not sync in the previous sync
  try {
    await synchronize({
      database,
      pullChanges,
      pushChanges,
      log
    })
  } catch (err) {
    console.log('SYNC ERROR:: ', err)
  }

  console.log('SYNC LOG:: ', log)
}

async function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    const delayTimeout = setTimeout(() => {
      clearTimeout(delayTimeout);
      resolve();
    }, delay);
  });
}

export default database
