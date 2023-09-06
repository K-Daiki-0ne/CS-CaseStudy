import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm"

@Entity()
export class StudyComment {

  @PrimaryGeneratedColumn()
  studyCommentId: number;

  @Column()
  @Index()
  userId: number;

  @Column()
  @Index()
  studyId: number;

  @Column("text")
  studyComment: string;

}