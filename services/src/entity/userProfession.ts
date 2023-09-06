import { Entity, Column, Index, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class UserProfession {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  userId: number;

  @Column("varchar", { length: 2 })
  professinId: string;

  @Column("nvarchar", { length: 50 })
  profession: string;

}