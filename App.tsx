import React, { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'
import { View, StyleSheet } from 'react-native'
import createStore from '@store'
import database from '@database/DatabaseInstance'
import useUnmount from '@hooks/useUnmount'
import { NoInternet } from '@components/NoInternet'
import { WorkpackListConnected } from '@screens/WorkpackList'

// NOTE: we probably do not even need the DatabaseProvider here
// as we're not going to use it as observable or directly in components
// just initting database instance might be enough

const App = () => {
  const [store, setStore] = useState<any>(undefined)
  const unmountingRef = useUnmount()

  useEffect(() => {
    init()
  }, [])

  if (!store) {
    return null
  }

  return (
    <Provider store={store}>
      <DatabaseProvider database={database}>
        <>
          <View style={styles.container}>
            <WorkpackListConnected />
          </View>
          <NoInternet />
        </>
      </DatabaseProvider>
    </Provider>
  )

  async function init() {
    const store = await createStore()

    if (unmountingRef.current) {
      return
    }

    setStore(store)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App
