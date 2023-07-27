import { CreateProductDTO } from '../dto/product-dto';
import { ResponseError } from '../dto/response-error';
import { BomMany } from '../models/bom';
import productRepository from '../repositories/product-repository';

const createProduct = async (dto: CreateProductDTO) => {
    let isProduct = await productRepository.findProductByName(dto.name)
    if (isProduct) {
        throw new ResponseError(409, `Product is already exist`, dto.mapToProduct())
    }

    const product = await productRepository.createProduct(dto.mapToProduct())

    let needs: any
    if (dto.needs) {
        needs = await productRepository.upsertManyProductByName(dto.needs.map((p) => p.mapToProduct()))
        await productRepository.connectMaterials(
            dto.needs.map(m => new BomMany(product.name, m.name, m.quantity)))
    }

    (product as any).needs = needs
    return product
}

const readAllProducts = async (name: string) => {
    return await productRepository.readAllProducts(name)
}

const readProductDetails = async (name: string) => {
    const product = await productRepository.readProductDetails(name)
    if (!product) {
        throw new ResponseError(404, `Product ${name} not found`);
    }

    return product
}

const updateProduct = async (originalName: string, dto: CreateProductDTO) => {
    const originalProduct = await productRepository.findProductByName(originalName)
    if (!originalProduct) {
        throw new ResponseError(409, `Product ${originalName} is not exist`)
    }

    const isProduct = await productRepository.findProductByName(dto.name)
    if (isProduct && isProduct.name != originalName) {
        throw new ResponseError(409, `Product is already exist`, dto.mapToProduct())
    }

    let updatedProduct = await productRepository.updateProductByName(originalName, dto.mapToProduct())

    let needs: any
    let deleted: any
    let connectMaterial: any
    if (dto.needs) {
        deleted = await productRepository.disconnectMaterial(dto.name)
        if (deleted.count < 1) {
            throw new ResponseError(500, 'Failed disconnect material');
        }

        needs = await productRepository.upsertManyProductByName(dto.needs.map((p) => p.mapToProduct()))
        connectMaterial = await productRepository.connectMaterials(
            dto.needs.map(m => new BomMany(dto.name, m.name, m.quantity)))
    }

    (updatedProduct as any).needs = needs
    return updatedProduct
}

export default {
    createProduct,
    readAllProducts,
    readProductDetails,
    updateProduct,
}