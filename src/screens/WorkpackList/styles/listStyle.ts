import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },
  scrollView: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100
  },
  noDataBlock: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  noData: {
    textAlign: 'center',
    padding: 15,
    width: '100%'
  },
  IconButton: {
    bottom: 30,
    right: 10
  },
  pullChangesButton: {
    width: '90%',
    marginTop: 15,
    marginHorizontal: '5%'
  }
})
