import { createSlice } from '@reduxjs/toolkit'
import { IWorkpack } from '@setup/types'

export interface WorkpackReducerType {
  results: Array<IWorkpack>,
  count: number
}

const _initialState: WorkpackReducerType = {
  count: 0,
  results: []
}

const workpackSlice = createSlice({
  name: 'workpack',
  initialState: _initialState,
  reducers: {
    setWorkpacks: (state, action) => {
      state = action.payload
    },
    createWorkpack: (state, action) => {
      state.results.unshift(action.payload)
      state.count += 1
    },
    updateWorkpack: (state, action) => {
      const idx = state.results.findIndex(v => v.id.toString() === action.payload.id.toString())
      if (idx > -1) {
        state.results[idx] = action.payload
      }
    },
    deleteWorkpack: (state, action) => {
      const idx = state.results.findIndex(v => v.id.toString() === action.payload.toString())
      if (idx > -1) {
        state.results.splice(idx, 1)
      }
    }
  }
})

export let ActionCreators = workpackSlice.actions
export function initBindActionsWorkpack(dispatch, bindActionCreators) {
  ActionCreators = bindActionCreators({
    ...workpackSlice.actions
  }, dispatch)
}
export default workpackSlice.reducer
