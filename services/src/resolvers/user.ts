import { ObjectType, Field, Mutation, Arg, Resolver, InputType } from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../entity';
import UserModel from '../models/User';

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
  
  @Mutation(() => UserResponse)
  async register(
    @Arg('user') user: UserInput
  ) {
    const isSuccess: boolean = await UserModel.updateUser(user);
    if (!isSuccess) {
      return {
        errors: [{
          field: 'register',
          message: 'ユーザーの作成に失敗しました'
        }]
      }
    }

    const registerUser = await UserModel.readUser(user.userId);

    return { registerUser }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('email') email: string, 
    @Arg('password') password: string
  ): Promise<UserResponse> {
    const user = await UserModel.loginUser(email, password);
    if (!user) {
      return {
        errors: [{
          field: 'email',
          message: '入力されたemailが存在しません'
        }]
      }
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid) {
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