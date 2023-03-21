import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

@Entity()
export class StudyHistory {

   @Column()
   @Index()
    userId: number

    @PrimaryGeneratedColumn()
    studyId: number

    @Column("varchar", { length: 2 })
    studyCategory!: number

    @Column("date")
    @Index()
    studyStartTime!: Date

    @Column("date")
    @Index()
    studyEndTime!: Date

    @Column()
    studyCommentId!: number;
}