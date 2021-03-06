import express from 'express'
const router = express.Router()
import {
    closebid,updatebid,newAuction,getOwnAuction,getAuction,placebid,verifybid,getAuctionById
   
} from '../controllers/bidController.js'


router.post('/',newAuction)
router.post('/placebid',placebid)
router.get('/own',getOwnAuction)
router.get('/byid',getAuctionById)
router.put('/close',closebid)
router.get('/all',getAuction)
router.put('/verify',verifybid)
router.put('/updatebid',updatebid)





export default router

/*
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/deliver/:id').put( updateOrderToDelivered)
*/

