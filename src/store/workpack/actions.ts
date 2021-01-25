// import { makeApiCall } from '@setup/api-client'
// import { Endpoints } from '@setup/api-client/Endpoints'

import { v4 as uuidv4 } from 'uuid';
import { IWorkpack } from '@app/setup/types';
import database, { dbSync } from '@database/DatabaseInstance'
import { WorkpackModel } from '@database/workpack/workpacks.watermelon'
import { ActionCreators } from './'

const CLIENT_UUID = 1

// NOTE: we need mappings between model and item in redux store
// NOTE: we need to autoinrement uuid and get clientUuid from store (currently all goes from template)
export async function createWorkpack(workpack: IWorkpack) {
  await database.action(async () => {
    try {
      const id = uuidv4()
      await database.collections.get<WorkpackModel>('workpacks')
        .create((entity) => {
          // entity.uuid = workpack.uuid
          entity.clientUuid = CLIENT_UUID
          entity.startDate = workpack.startDate
          entity.endDate = workpack.endDate
          entity.name = workpack.name
          entity.companyName = workpack.companyName
          entity.duct100Count = workpack.duct100Count
          entity.auditDueDate = workpack.auditDueDate
          entity.fulfilmentDueDate = workpack.fulfilmentDueDate

          entity._raw.id = id
        })


      ActionCreators.createWorkpack({ ...workpack, id })
      // dbSync(CLIENT_UUID)
    } catch (err) {
      // display an error
      console.log('ERROR occured: ', err)
    }
  })
}

export async function updateWorkpack(workpack: IWorkpack) {
  await database.action(async () => {
    try {
      const workpacks = database.collections.get<WorkpackModel>('workpacks')
      const matched = await workpacks.find(workpack.id)

      if (matched) {
        await matched.update((entity) => {
          entity.startDate = workpack.startDate
          entity.endDate = workpack.endDate
          entity.name = workpack.name
          entity.companyName = workpack.companyName
          entity.duct100Count = workpack.duct100Count
          entity.auditDueDate = workpack.auditDueDate
          entity.fulfilmentDueDate = workpack.fulfilmentDueDate
        })

        ActionCreators.updateWorkpack({ ...workpack, id: matched.id })
        // dbSync(CLIENT_UUID)
      }
    } catch (err) {
      // display an error
      console.log('ERROR occured: ', err)
    }
  })
}

export async function deleteWorkpack(id: string) {
  await database.action(async () => {
    try {
      const workpacks = database.collections.get<WorkpackModel>('workpacks')
      const matched = await workpacks.find(id)

      if (matched) {
        await matched.markAsDeleted() // syncable

        // NOTE: I THINK THAT I MUST NOT DELETE IT PERMANENTLY UNTIL I SYNC IT SUCCESSFULLY
        // SO, possibly instead I should store some stack of items for permanent delition. Delete them and flush the stack in next successfull sync

        // await matched[0].destroyPermanently() // permanent

        ActionCreators.deleteWorkpack(id)
        // dbSync(CLIENT_UUID)
      }
    } catch (err) {
      // display an error
      console.log('ERROR occured: ', err)
    }
  })
}
