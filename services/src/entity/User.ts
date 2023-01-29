import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number

    @PrimaryColumn()
    userName: string

    @Column("varchar", { length: 100 })
    password: string

    @Column()
    professionId!: number

    @Column()
    age!: number

    @Column()
    createdAt!: Date;

    @Column()
    updatedAt!: Date;
}