import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNetInfo } from '@react-native-community/netinfo'

export function NoInternet () {
  const netInfo = useNetInfo()

  if (netInfo.isConnected) {
    return null
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Currently you are offline
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 100
  },
  message: {
    fontSize: 24,
    lineHeight: 60,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
