// import { makeApiCall } from '@setup/api-client'
// import { Endpoints } from '@setup/api-client/Endpoints'

import { Q } from '@nozbe/watermelondb'
import { IWorkpack } from '@app/setup/types';
import database, { dbSync } from '@database/DatabaseInstance'
import { WorkpackModel } from '@database/workpack/workpacks.watermelon'
import { ActionCreators } from './'

const CLIENT_UUID = 1

// NOTE: we need mappings between model and item in redux store
// NOTE: we need to autoinrement uuid and get clientUuid from store (currently all goes from template)
export async function createWorkpack (workpack: IWorkpack) {
  await database.action(async () => {
    try {
      await database.collections.get<WorkpackModel>('workpacks')
        .create((entity) => {
          entity.uuid = workpack.uuid
          entity.clientUuid = workpack.clientUuid
          entity.startDate = workpack.startDate
          entity.endDate = workpack.endDate
          entity.name = workpack.name
          entity.companyName = workpack.companyName
          entity.duct100Count = workpack.duct100Count
          entity.auditDueDate = workpack.auditDueDate
          entity.fulfilmentDueDate = workpack.fulfilmentDueDate
        })

      ActionCreators.createWorkpack(workpack)
      dbSync(CLIENT_UUID)
    } catch (err) {
      // display an error
      console.log('ERROR occured: ', err)
    }
  })
}

export async function updateWorkpack (workpack: IWorkpack) {
  await database.action(async () => {
    try {
      const workpacks = database.collections.get<WorkpackModel>('workpacks')
      const matched = await workpacks.query(Q.where('uuid', workpack.uuid)).fetch()

      if (matched) {
        await matched[0]
          .update((entity) => {
            entity.uuid = workpack.uuid
            entity.clientUuid = workpack.clientUuid
            entity.startDate = workpack.startDate
            entity.endDate = workpack.endDate
            entity.name = workpack.name
            entity.companyName = workpack.companyName
            entity.duct100Count = workpack.duct100Count
            entity.auditDueDate = workpack.auditDueDate
            entity.fulfilmentDueDate = workpack.fulfilmentDueDate
          })

        ActionCreators.updateWorkpack(workpack)
        dbSync(CLIENT_UUID)
      }
    } catch (err) {
      // display an error
      console.log('ERROR occured: ', err)
    }
  })
}

export async function deleteWorkpack (uuid: string) {
  await database.action(async () => {
    try {
      const workpacks = database.collections.get<WorkpackModel>('workpacks')
      const matched = await workpacks.query(Q.where('uuid', uuid)).fetch()

      if (matched) {
        await matched[0].markAsDeleted() // syncable

        // NOTE: I THINK THAT I MUST NOT DELETE IT PERMANENTLY UNTIL I SYNC IT SUCCESSFULLY
        // SO, possibly instead I should store some stack of items for permanent delition. Delete them and flush the stack in next successfull sync

        // await matched[0].destroyPermanently() // permanent

        ActionCreators.deleteWorkpack(uuid)
        dbSync(CLIENT_UUID)
      }
    } catch (err) {
      // display an error
      console.log('ERROR occured: ', err)
    }
  })
}
