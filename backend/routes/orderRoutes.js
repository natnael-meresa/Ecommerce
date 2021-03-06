import express from 'express'
const router = express.Router()
import { addOrderItems , getOrderById, updateOrderToPaid, getMyOrders, getOrders,updateOrderToDelivered } from '../controllers/orderController.js'
import { protect, isAdmin } from '../middleware/authMiddleware.js'

router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered)

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)


export default router