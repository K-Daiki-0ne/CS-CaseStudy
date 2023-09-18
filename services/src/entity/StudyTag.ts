import { ObjectType, Field } from "type-graphql";
import { 
  Entity, 
  Column, 
  Index, 
  PrimaryGeneratedColumn, 
  PrimaryColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from "typeorm"

@ObjectType()
@Entity()
export class StudyTag {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @PrimaryColumn()
  @Index()
  userId!: string;

  @Field()
  @Column("varchar", { length: 2 })
  studyTagKey!: string;

  @Field()
  @Column("nvarchar", { length: 20 })
  studyTagLabel!: string;

  @Field()
  @Column({ type: 'boolean' })
  @Index()
  show!: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}