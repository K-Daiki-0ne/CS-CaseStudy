import { ObjectType, Field } from "type-graphql";
import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn, 
  UpdateDateColumn, 
  Index 
} from "typeorm"

@ObjectType()
@Entity()
export class User {

  @Field()
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Field()
  @Column({ type: 'nvarchar', length: 20 })
  userName!: string

  @Column("varchar", { length: 100 })
  @Index()
  password!: string

  @Field()
  @Column({ unique: true })
  email!: string

  @Field()
  @Column({ type: 'varchar', length: 2 })
  professionId: string

  @Field()
  @Column({ type: 'nchar' })
  goal: string

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}