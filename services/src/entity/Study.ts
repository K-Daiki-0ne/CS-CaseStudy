import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, Index, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Study {

  @PrimaryGeneratedColumn()
  studyId!: number;

  @Column()
  @PrimaryColumn()
  userId!: string;

  @Column({ type: 'year' })
  @Index()
  studyYear!: number;

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