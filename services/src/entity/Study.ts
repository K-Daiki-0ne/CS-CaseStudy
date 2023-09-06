import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

@Entity()
export class Study {

   @Column()
   @Index()
    userId: number

    @PrimaryGeneratedColumn()
    studyId: number

    @Column("varchar", { length: 2 })
    studyCategory!: string

    @Column("date")
    @Index()
    studyTime: Date

    @Column()
    studyCommentId: number;
}