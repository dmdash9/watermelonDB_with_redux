import React from 'react'
import { View, Text } from 'react-native'
import { IWorkpack } from '@setup/types'
import { Button } from '@components/Button'
import styles from './styles/itemStyle'

export interface WorkpackItemProps {
  workpack: IWorkpack,
  update: (workpack: IWorkpack) => Promise<void>,
  delete: (uuid: string) => Promise<void>
}

export function WorkpackItem(props: WorkpackItemProps) {
  const { workpack } = props

  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <Text>Name</Text>
        <Text>{workpack.name}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text>Start Date</Text>
        <Text>{workpack.startDate}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text>End Date</Text>
        <Text>{workpack.endDate}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text>Number of appartments</Text>
        <Text>{workpack.duct100Count}</Text>
      </View>
      <View style={styles.infoRow}>
        <Button
          style={actionButtonStyle}
          onPress={() => props.update(workpack)}
          text='Update'
        />
        <Button
          style={actionButtonStyle}
          onPress={() => props.delete(workpack.id)}
          text='Delete'
        />
      </View>
    </View>
  )
}

const actionButtonStyle = { button: styles.actionButton }