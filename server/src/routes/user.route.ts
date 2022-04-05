import {createUser, getAllUsers, getUser} from '@controllers/user.controller'
import express from 'express'
const router = express.Router()

router.route('/get').get(getAllUsers)
router.route('/get/:id').get(getUser)
router.route('/create').post(createUser)
export default router
