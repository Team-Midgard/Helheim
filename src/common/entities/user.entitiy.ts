import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../utils/base.entitiy";

@Entity()
export class UserEntity extends BaseEntity {
    constructor() {
        super()
    }
}