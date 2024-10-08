import { AppDataSource } from "../database/database";
import { Repository, FindOptionsWhere, FindManyOptions, EntityTarget } from "typeorm";
import { BaseEntity } from "./base.entitiy";

export default abstract class BaseRepository<T extends BaseEntity> {
    protected repository: Repository<T>

    constructor(
        private readonly entity: EntityTarget<T>
    ) {
        this.repository = AppDataSource.getRepository(this.entity)
    }

}