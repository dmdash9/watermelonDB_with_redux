import { combineReducers } from 'redux'
import workpackReducer, { WorkpackReducerType } from './workpack'

const rootReducer = combineReducers({
  workpack: workpackReducer
})

// TODO: figure out how to setup typescript support to get ReturnType utility type working
export type RootState = {
  workpack: WorkpackReducerType
}

export default rootReducer
