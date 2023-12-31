import { Payload } from '../dto/payload'
import { Request, Response, NextFunction } from 'express'
import { CreateProductDTO, Material } from '../dto/product-dto'
import productService from '../services/product-service'
import validation from '../utils/validation'
import { ResponseError } from '../dto/response-error'

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)
        await validation.validateProduct(req)

        const materials = req.body.materials ?? [];
        const dto: CreateProductDTO = new CreateProductDTO(
            req.body.name,
            req.body.description,
            materials.map((m: any) => new Material(m.name, parseInt(m.quantity))))

        const product = await productService.createProduct(dto)
        const payload: Payload = new Payload(`Product ${req.body.name} successfully created`, product)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const readAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateProductNameQuery(req)

        const name: string = req.query.name as string || ''

        const product = await productService.readAllProducts(name)
        const payload: Payload = new Payload(`Products successfully fetched`, product)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const readProductDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await validation.validateProductNameParam(req)

        const name: string = req.params.name

        const product = await productService.readProductDetails(name)
        const payload: Payload = new Payload(`Product ${name} successfully fetched`, product)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)

        await validation.validateProductNameParam(req)
        const name: string = req.params.name
        await validation.validateProduct(req)

        const materials = req.body.materials ?? [];
        const dto: CreateProductDTO = new CreateProductDTO(
            req.body.name,
            req.body.description,
            materials.map((m: any) => new Material(m.name, parseInt(m.quantity))))

        const product = await productService.updateProduct(name, dto)
        const payload: Payload = new Payload(`Product ${name} successfully updated`, product)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        validation.validateAdminRole(req.payload?.level)

        await validation.validateProductNameParam(req)
        const validateKey: string = req.header('HX-Prompt') || ''
        const name: string = req.params.name

        if (validateKey !== name) {
            throw new ResponseError(422, 'The provided prompt does not match the ID to be deleted')
        }

        const product = await productService.deleteProduct(name)
        const payload: Payload = new Payload(`Product ${name} successfully deleted`, product)

        res.status(200).json(payload)
    } catch (e) {
        next(e)
    }
}

export default {
    createProduct,
    readAllProducts,
    readProductDetails,
    updateProduct,
    deleteProduct,
}