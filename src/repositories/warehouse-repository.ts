import { prisma } from '../utils/database'
import { Warehouse } from '../models/warehouse'

const createNewWarehouse = async (wh: Warehouse) => {
    return prisma.warehouse.create({ data: wh })
}

const readWarehouses = async () => {
    return prisma.warehouse.findMany()
}

const updateWarehouse = async (original: string, wh: Warehouse) => {
    return prisma.warehouse.update({
        where: { location: original },
        data: { location: wh.location }
    })
}

const deleteWarehouseByLocation = async (location: string) => {
    return prisma.warehouse.delete({
        where: { location: location }
    });
}

const findWarehouseByLocation = async (location: string) => {
    return prisma.warehouse.findUnique({
        where: { location: location }
    })
}

export default {
    createNewWarehouse,
    readWarehouses,
    updateWarehouse,
    deleteWarehouseByLocation,
    findWarehouseByLocation,
}