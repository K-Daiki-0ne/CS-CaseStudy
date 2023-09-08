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

  @Column({ type: 'int', length: 8 })
  studyDate: number;

  // time/minute
  @Column({ type: 'int', length: 4 })
  studyTime: number;

  @Column()
  studyTagId: number;

  @Column()
  studyContent: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}