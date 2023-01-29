import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class StudyHistory {

   @Column()
    userId: number

    @PrimaryGeneratedColumn()
    studyId: number

    @Column()
    studyCategory!: number

    @Column()
    studyStartTime!: Date

    @Column()
    studyEndTime!: Date

    @Column()
    studyContent!: string;

    @Column()
    studyCommentId!: number;
}