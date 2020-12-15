import express from 'express'
import {
  createWorkpack,
  updateWorkpack,
  deleteWorkpack
} from '../actions/workpacks'

const router = express.Router()

router.create = async (req, res) => {
  try {
    await createWorkpack(req.body)
    return res.status(200).send({ data: 'created okay' })
  } catch (error) {
    console.log('ERROR CREATE WORKPACK:: ', error)
    return res.status(500).send({ error })
  }
}

router.update = async (req, res) => {
  try {
    const data = await updateWorkpack(req.body)
    return res.status(200).send({ data })
  } catch (error) {
    console.log('ERROR UPDATE WORKPACK:: ', error)
    return res.status(500).send({ error })
  }
}

router.delete = async (req, res) => {
  try {
    await deleteWorkpack(req.query.uuid)
    return res.status(200).send({ message: 'deleted okay' })
  } catch (error) {
    console.log('ERROR DELETE WORKPACK:: ', error)
    return res.status(500).send({ error })
  }
}

export default router
