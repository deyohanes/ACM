import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  getOwnProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  newAuction,
  verifybid,
  placebid,
  getAuction,
  getOwnAuction,
  getAuctionById,
  closeAuction,
  getfilter,
  ownproducts,
  reqpro

} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
router.post('/auction/:id',newAuction)
router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router.get('/own', getOwnProducts)
router.get('/auction/all', getAuction)
router.get('/products/own', ownproducts)
router.post('/request', reqpro)


router.get('/filter', getfilter)
router.get('/auction/byid', getAuctionById)
router.put('/auction/close/:id', closeAuction)
router.get('/auction/own/:id', getOwnAuction)
router.get('/products/own/:id', getOwnProducts)

router.put('/auction/verify/:id',verifybid)
router.post('/auction/placebid/:id',placebid)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
/////////////////////

/*
router.post('/placebid',placebid)
router.get('/own',getOwnAuction)
router.get('/byid',getAuctionById)
router.put('/close',closebid)
router.get('/all',getAuction)
router.put('/verify',verifybid)
router.put('/updatebid',updatebid)
*/

export default router
