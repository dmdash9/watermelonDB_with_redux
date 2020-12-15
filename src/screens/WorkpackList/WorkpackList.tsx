import React from 'react'
import { ScrollView, Text, SafeAreaView, View } from 'react-native'
import { WorkpackItem } from './WorkpackItem'
import { IconButton } from '@components/IconButton'
import { Button } from '@components/Button'
import { IWorkpack } from '@setup/types'
import styles from './styles/listStyle'

export interface WorkpackListProps {
  workpacks: Array<IWorkpack>,
  count: number,
  create: () => Promise<void>,
  update: (workpack: IWorkpack) => Promise<void>,
  delete: (uuid: string) => Promise<void>,
  sync: () => Promise<void>
}

export function WorkpackList (props: WorkpackListProps) {
  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
      <IconButton
        style={IconButtonStyle}
        onPress={props.create}
      />
    </SafeAreaView>
  )

  function renderContent () {
    if (props.count === 0) {
      return (
        <>
          <Button
            style={actionButtonStyle}
            onPress={props.sync}
            text='Sync'
          />
          <View style={styles.noDataBlock}>
            <Text style={styles.noData}>No workpacks</Text>
          </View>
        </>
      )
    }

    return (
      <>
        <Button
          style={actionButtonStyle}
          onPress={props.sync}
          text='Pull Changes'
        />
        <ScrollView contentContainerStyle={styles.scrollView}>
          {
            props.workpacks.map(v => {
              console.log('v - ', v)
              return (
                <WorkpackItem
                  key={v.uuid}
                  workpack={v}
                  update={props.update}
                  delete={props.delete}
                />
              )
            })
          }
        </ScrollView>
      </>
    )
  }
}

const actionButtonStyle = { button: styles.pullChangesButton }
const IconButtonStyle = { button: styles.IconButton }
