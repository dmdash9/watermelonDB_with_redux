import express from 'express'
import {
  applyChanges,
  getLatestChanges
} from '../actions/workpacks'

import { createChangesPayload } from '../utilities/createChangesPayload'

const router = express.Router()

router.pushChanges = async (req, res) => {
  try {
    console.log('pushChanges to client query::: ', req.query)
    let data = await getLatestChanges(req.query.clientUuid, req.query.lastPulledAt)

    console.log('RAW DATA::: ', data)
    data = createChangesPayload(data.filter(v => Array.isArray(v)), 'workpacks')
    console.log(' pushChanges to client::: ', data)
    return res.status(200).send(data)
  } catch (error) {
    console.log('ERROR PUSH CHANGES::: ', error)
    return res.status(500).send({ error })
  }
}

router.pullChanges = async (req, res) => {
  try {
    console.log('pullChanges from client::: ', req.body)
    await applyChanges(req.body, req.query.lastPulledAt)
    return res.status(200).send({ message: 'changes applied all right' })
  } catch (error) {
    console.log('ERROR PULL CHANGES::: ', error)
    return res.status(500).send({ error })
  }
}

export default router
