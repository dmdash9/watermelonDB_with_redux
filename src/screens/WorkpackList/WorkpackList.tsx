import React from 'react'
import { ScrollView, Text, SafeAreaView, View } from 'react-native'
import { WorkpackItem } from './WorkpackItem'
import { IconButton } from '@components/IconButton'
import { IWorkpack } from '@setup/types'
import styles from './styles/listStyle'

export interface WorkpackListProps {
  workpacks: Array<IWorkpack>,
  count: number,
  create: () => Promise<void>,
  update: (workpack: IWorkpack) => Promise<void>,
  delete: (uuid: string) => Promise<void>
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
        <View style={styles.noDataBlock}>
          <Text style={styles.noData}>No workpacks</Text>
        </View>
      )
    }

    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        {
          props.workpacks.map(v => {
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
    )
  }
}

const IconButtonStyle = {
  button: styles.IconButton
}
