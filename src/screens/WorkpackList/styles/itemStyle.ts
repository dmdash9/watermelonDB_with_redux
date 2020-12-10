import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 10
  },
  infoRow: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
  actionButton: {
    flex: 1,
    maxWidth: 100
  }
})
