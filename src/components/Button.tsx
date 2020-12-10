import React from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'

export interface ButtonProps {
  style?: {
    button: { [key: string]: string | number }
  },
  onPress: () => void,
  text: string
}

export function Button (props: ButtonProps) {
  return (
    <Pressable
      style={[styles.button, props.style?.button]}
      onPress={props.onPress}
      android_ripple={androidRipple}
    >
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  )
}

const androidRipple = {
  color: 'rgb(210, 230, 255)',
  radius: 100
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#444',
    borderWidth: 1,
    elevation: 1
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000'
  }
})
