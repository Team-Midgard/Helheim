import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number | undefined

    @Column({ type: "varchar", unique: true })
    email: string | undefined

    @Column({ type: "varchar" })
    username: string | undefined
}