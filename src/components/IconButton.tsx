import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

export interface IconButtonProps {
  style?: {
    button: { [key: string]: string | number }
  },
  onPress: () => void
}

export function IconButton (props: IconButtonProps) {
  return (
    <Pressable
      style={[styles.button, props.style?.button]}
      onPress={props.onPress}
      android_ripple={androidRipple}
    >
      <Text style={styles.text}>+</Text>
    </Pressable>
  )
}

const androidRipple = {
  color: 'rgb(210, 230, 255)',
  radius: 35
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    zIndex: 10,
    elevation: 1
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000'
  }
})
