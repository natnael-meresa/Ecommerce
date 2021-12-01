import express from 'express'
const router = express.Router()
import { authUser, registerUser,updateUserProfile, getUserProfile, getUsers, deleteUser, getUserById, updateUser } from '../controllers/userController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
router.route('/').post(registerUser).get(protect,isAdmin,getUsers)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)

router.route('/:id').delete(protect, isAdmin, deleteUser).get(protect, isAdmin, getUserById).put(protect, isAdmin, updateUser)



export default router