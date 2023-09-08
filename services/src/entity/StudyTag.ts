import { Entity, Column, Index, PrimaryGeneratedColumn, PrimaryColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class StudyTag {

  @PrimaryGeneratedColumn()
  id!: number;

  @PrimaryColumn()
  @Index()
  userId!: string;

  @Column("varchar", { length: 2 })
  studyTagKey!: string;

  @Column("nvarchar", { length: 20 })
  studyTagLabel!: string;

  @Column({ type: 'boolean' })
  @Index()
  show!: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}