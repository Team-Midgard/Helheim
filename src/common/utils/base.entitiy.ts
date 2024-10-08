import { Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined
}