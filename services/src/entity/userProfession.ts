import { Entity, Column, Index } from "typeorm"

@Entity()
export class UserProfession {

  @Column()
  @Index()
  userId: number;

  @Column("varchar", { length: 2 })
  professinId: string;

  @Column("nvarchar", { length: 50 })
  profession: string;

}