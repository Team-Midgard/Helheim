import { BeforeUpdate, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "../utils/base.entitiy";

@Entity()
export class UserEntity extends BaseEntity {
    @Column({ type: "varchar" })
    username: string | undefined

    @Column({ type: "varchar", unique: true })
    email: string | undefined

    @Column(({ type: "varchar", }))
    password: string | undefined

    @Column(({ type: "datetime", default: () => "CURRENT_TIMESTAMP" }))
    created_at: Date | undefined

    @Column(({ type: "datetime", nullable: true }))
    updated_at: Date | undefined
    @BeforeUpdate()
    updateTimeStamp() {
        this.updated_at = new Date();
    }
}