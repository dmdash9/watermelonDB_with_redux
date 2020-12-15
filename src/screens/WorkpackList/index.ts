import { RootState } from '@app/store/rootReducer'
import { connect } from 'react-redux'
import { WorkpackList, WorkpackListProps } from './WorkpackList'
import { createWorkpack, updateWorkpack, deleteWorkpack } from '@store/workpack/actions'
import { createItemFromMock } from '@database/workpack/mock'
import { dbSync } from '@database/DatabaseInstance'
import { IWorkpack } from '@setup/types'

const CLIENT_UUID = 1

async function create () {
  return createWorkpack(createItemFromMock())
}

async function update (workpack: IWorkpack) {
  return updateWorkpack({ ...workpack, duct100Count: workpack.duct100Count + 1 })
}

const mapStateToProps = (state: RootState): WorkpackListProps => {
  return {
    workpacks: state.workpack.results,
    count: state.workpack.count,
    create,
    update,
    delete: deleteWorkpack,
    sync: () => dbSync(CLIENT_UUID)
  }
}

export const WorkpackListConnected = connect(mapStateToProps)(WorkpackList)
