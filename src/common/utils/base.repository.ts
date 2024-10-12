import { AppDataSource } from "../database/database";
import { type Repository, FindOptionsWhere, FindManyOptions, type EntityTarget } from "typeorm";
import type { BaseEntity } from "./base.entitiy";

export default abstract class BaseRepository<T extends BaseEntity> {
    protected repository: Repository<T>

    constructor(
        private readonly entity: EntityTarget<T>
    ) {
        this.repository = AppDataSource.getRepository(this.entity)
    }

}