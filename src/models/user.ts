import { Role } from '@prisma/client';

class User {
    id?: number
    name: string
    level?: Role
    password: string

    constructor(name: string, password: string, id?: number, level?: Role) {
        this.name = name
        this.password = password
        this.id = id
        this.level = level
    }
}

export {
    User
}