import { Entity, PrimaryGeneratedColumn, Column, Index, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class StudyHistory {

  @PrimaryGeneratedColumn()
  StudyHistoryId: number;

  @PrimaryColumn()
  studyId: number;

  @Column()
  @PrimaryColumn()
  userId: string;

  @CreateDateColumn()
  postDate: Date

  @Column()
  deletedFlg: string;

  @Column({ type: 'year' })
  @Index()
  studyYear: number;

  @Column({ type: 'int' })
  studyDate: number;

  // time/minute
  @Column({ type: 'int' })
  studyTime: number;

  @Column()
  studyTagId: number;

  @Column({ type: 'text' })
  studyContent: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}