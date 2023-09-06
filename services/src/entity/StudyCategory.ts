import { Entity, Column, Index, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class StudyCategory {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  userId: number;

  @Column("varchar", { length: 2 })
  studyCategoryId: string;

  @Column("nvarchar", { length: 20 })
  studyCategory: string;

}