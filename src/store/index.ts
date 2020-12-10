import { bindActionCreators } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import initBindActions from './initBindActions'
import initState from './initState'

export default async function () {
  const preloadedState = await initState()

  const store = configureStore({
    reducer: rootReducer,
    preloadedState
  })

  initBindActions(store.dispatch, bindActionCreators)
  return store
}
