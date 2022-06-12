import express from 'express'
const router = express.Router()
import {
    addAd,retrieveAds,findAd,updateAd
    //,deleteAd,updateAd,findAd,retrieveAds
   
} from '../controllers/ad.js'


router.post('/nauction',addAd) 
router.get('/retriev',retrieveAds)
router.get('/byid',findAd)
router.put('/update/:id',updateAd)


export default router
/*
router.get('/own',getOwnAuction)
router.get('/byid',getAuctionById)

router.get('/all',getAuction)
router.put('/verify',verifybid)
router.put('/updatebid',updatebid)



*/



/*
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router.route('/deliver/:id').put( updateOrderToDelivered)
*/

