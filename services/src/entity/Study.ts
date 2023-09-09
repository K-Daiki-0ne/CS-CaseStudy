import { ObjectType, Field } from "type-graphql";
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  PrimaryColumn, 
  Column, 
  Index, 
  CreateDateColumn, 
  UpdateDateColumn 
} from "typeorm"

@ObjectType()
@Entity()
export class Study {

  @Field()
  @PrimaryGeneratedColumn()
  studyId!: number;

  @Field()
  @Column()
  @PrimaryColumn()
  userId!: string;

  @Field()
  @Column({ type: 'year' })
  @Index()
  studyYear!: number;

  @Field()
  @Column({ type: 'int' })
  studyDate: number;

  @Field()
  // time/minute
  @Column({ type: 'int' })
  studyTime: number;

  @Field()
  @Column()
  studyTagId: number;

  @Field()
  @Column({ type: 'text' })
  studyContent: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}