import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({ type: 'nvarchar', length: 20 })
    userName!: string

    @Column("varchar", { length: 20 })
    @Index()
    password!: string

    @Column({ unique: true })
    @Index()
    email!: string

    @Column({ type: 'varchar', length: 2 })
    professionId: string

    @Column({ type: 'int', length: 3 })
    age: number

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}