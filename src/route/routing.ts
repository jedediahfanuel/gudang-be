import express from 'express'
import viewController from '../controllers/view-controller'

const privateRouter = express.Router()

// STAFF
privateRouter.get('/add-stock', viewController.addStock)
privateRouter.get('/production', viewController.production)
privateRouter.post('/api/transaction', viewController.createTransaction)

// ADMIN
// privateRouter.post('/warehouse', viewController.createWarehouse)
// privateRouter.put('/warehouse/:location', viewController.updateWarehouse)
// privateRouter.delete('/warehouse/:location', viewController.deleteWarehouse)

// privateRouter.post('/product', viewController.createProduct)
// privateRouter.put('/product/:name', viewController.updateProduct)
// privateRouter.delete('/product/:name', viewController.deleteProduct)

// privateRouter.put('/transaction/:id', viewController.updateTransaction)

export {
    privateRouter
}