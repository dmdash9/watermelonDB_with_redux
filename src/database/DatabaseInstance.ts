import {
  appSchema,
  AppSchema,
  Database,
  DatabaseAdapter,
} from '@nozbe/watermelondb'

import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import {
  workpacksSchema,
  WorkpackModel
} from './workpack/workpacks.watermelon'

const schema: AppSchema = appSchema({
  version: 1,
  tables: [
    workpacksSchema
  ]
})

const adapter: DatabaseAdapter = new SQLiteAdapter({ schema })

// NOTE: I think that we need to patch database action and use it here with some logic of queueing actions while other related
// are in progress, or when sync is in progress. TO DISCUSS

export default new Database({
  adapter,
  modelClasses: [
    WorkpackModel
  ],
  actionsEnabled: true
})
