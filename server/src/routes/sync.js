import express from 'express'
import {
  applyChanges,
  getLatestChanges
} from '../actions/workpacks'

import { createChangesPayload } from '../utilities/createChangesPayload'

const router = express.Router()

router.pushChanges = async (req, res) => {
  try {
    const lpa = isNaN(req.query.lastPulledAt) ? 0 : Number(req.query.lastPulledAt)
    console.log('pushChanges to client query::: ', JSON.stringify(req.query, null, 4))
    let data = await getLatestChanges(req.query.clientUuid, lpa)

    console.log('RAW DATA::: ', JSON.stringify(data, null, 4))
    data = createChangesPayload(data.filter(v => Array.isArray(v)), 'workpacks')
    console.log(' pushChanges to client::: ', JSON.stringify(data, null, 4))
    return res.status(200).send(data)
  } catch (error) {
    console.log('ERROR PUSH CHANGES::: ', error)
    return res.status(500).send({ error })
  }
}

router.pullChanges = async (req, res) => {
  try {
    const lpa = isNaN(req.query.lastPulledAt) ? 0 : Number(req.query.lastPulledAt)
    console.log('pullChanges from client::: ', req.body)
    await applyChanges(req.body, lpa)
    return res.status(200).send({ message: 'changes applied all right' })
  } catch (error) {
    console.log('ERROR PULL CHANGES::: ', error)
    return res.status(500).send({ error })
  }
}

export default router
