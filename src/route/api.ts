import express from 'express'
import trController from '../controllers/transaction-controller'
import prController from '../controllers/product-controller'
import whController from '../controllers/warehouse-controller'
import { authMiddleware } from '../middleware/auth-middleware'

const privateApi = express.Router()
privateApi.use(authMiddleware)

// STAFF
privateApi.post('/api/transaction', trController.createTransaction)

// ADMIN
privateApi.post('/api/warehouse', whController.createWarehouse)
privateApi.put('/api/warehouse/:location', whController.updateWarehouse)
privateApi.delete('/api/warehouse/:location', whController.deleteWarehouse)

privateApi.post('/api/product', prController.createProduct)
privateApi.put('/api/product/:name', prController.updateProduct)
privateApi.delete('/api/product/:name', prController.deleteProduct)

privateApi.put('/api/transaction/:id', trController.updateTransaction)

export {
    privateApi
}