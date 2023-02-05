import { Entity, Column, Index } from "typeorm"

@Entity()
export class StudyCategory {

  @Column()
  @Index()
  userId: number;

  @Column("varchar", { length: 2 })
  studyCategoryId: string;

  @Column("nvarchar", { length: 50 })
  studyCategory: string;

}