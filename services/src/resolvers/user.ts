import { ObjectType, Field, Mutation, Arg, Resolver, InputType, Query } from 'type-graphql';
// import argon2 from 'argon2';
import { User } from '../entity';
import UserModel from '../models/user'

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class UserInput {
  @Field()
  userId: string;

  @Field()
  userName: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  professionId?: string;
}

@Resolver(User)
export class UserResolver {

  @Query(() => Boolean)
  async changePassword(@Arg('email') email: string): Promise<Boolean> {
    // 受け取ったemailを送信するのみ
    

    return true;
  }


  @Mutation(() => Boolean)
  async createUser(@Arg('email') email: string): Promise<boolean> {
    const isSuccess: boolean =  await UserModel.createUser(email);

    if (!isSuccess) {
      return false
    }

    // メール用のリンクを送付する
    return true;
  }
  
  @Mutation(() => UserResponse)
  async register(
    @Arg('user') userInput: UserInput
  ) {
    const isSuccess: boolean = await UserModel.updateUser(userInput);
    if (!isSuccess) {
      return {
        errors: [{
          field: 'register',
          message: 'ユーザーの作成に失敗しました'
        }]
      }
    }

    const user = await UserModel.readUser(userInput.userId);

    return { user }
  }

  @Query(() => UserResponse)
  async login(
    @Arg('email') email: string, 
    @Arg('password') password: string
  ): Promise<UserResponse> {
    console.log('email', email);
    console.log('password', password);
    const user = await UserModel.loginUser(email);
    if (!user) {
      return {
        errors: [{
          field: 'email',
          message: '入力されたemailが存在しません'
        }]
      }
    }

    if (user.password != password) {
      return {
        errors: [{
          field: 'password',
          message: 'パスワードに誤りがあります'
        }]
      }
    }

    return { user }
  }
}