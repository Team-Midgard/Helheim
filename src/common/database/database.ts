import "reflect-metadata"
import { DataSource } from "typeorm"

import { UserEntity as User } from "../entities/user.entitiy"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})

export const HandleDatabase = async () => {
    await AppDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    })
}