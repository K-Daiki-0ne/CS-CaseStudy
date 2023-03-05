import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    userId: number

    @PrimaryColumn()
    @Index()
    userName: string

    @Column("varchar", { length: 20 })
    @Index()
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