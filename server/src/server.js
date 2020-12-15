import express from 'express'
import bodyParser from 'body-parser'
import syncRoutes from './routes/sync'
import workpackRoutes from './routes/workpack'

const imagePath = require('path').resolve('./images')
const app = express()

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  next()
})

app.use('/images', express.static(imagePath))

app.use(bodyParser.json())

app.get('/sync', syncRoutes.pushChanges)
app.post('/sync', syncRoutes.pullChanges)

app.post('/workpack', workpackRoutes.create)
app.put('/workpack', workpackRoutes.update)
app.delete('/workpack', workpackRoutes.delete)

app.listen(8080, () => {
  console.log('Server started on port 8080')
})

process.on('uncaughtException', err => {
  console.log(err)
})
