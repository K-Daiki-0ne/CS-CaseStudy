import { ObjectType, Field, Mutation, Arg, Resolver, InputType, Query } from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../entity';
import UserModel from '../models/user';
import { sendEmail } from '../utils/sendEmail';

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

  @Field({ nullable: true })
  password?: string;

  @Field({ nullable: true })
  professionId?: string;

  @Field({ nullable: true })
  goal?: string;
}


@Resolver(User)
export class UserResolver {

  @Mutation(() => Boolean)
  async changePassword(@Arg('email') email: string): Promise<Boolean> {
    // 受け取ったemailを送信するのみ
    const user = await UserModel.readUserForEmail(email);
    
    // CaseStudyに登録されていないメールアドレスの場合
    if (user == '') {
      return false;
    };

    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${user}">パスワード変更</a>`
    )

    return true;
  }

  @Query(() => Boolean)
  async isUser(@Arg('userId') userId: string): Promise<boolean> {
    const user = await UserModel.readAlreadyUser(userId);

    // ユーザー情報が存在しない場合
    if (user == null) {
      return false;
    }

    // ユーザーが仮登録の場合
    if (user.userName == '') {
      return false;
    }

    return true;
  }

  @Query(() => UserResponse)
  async readUserForUserId(@Arg('userId') userId: string): Promise<UserResponse> {
    const user = await UserModel.readUserForUserId(userId);

    if (user == null) {
      return {
        errors: [{
          field: 'readUserForUserId',
          message: '入力されたUserは存在しません'
        }]
      }
    };

    return { user };
  }

  @Mutation(() => Boolean)
  async createUser(@Arg('email') email: string): Promise<boolean> {
    const isSuccess: boolean =  await UserModel.createUser(email);

    if (!isSuccess) {
      return false
    }

    // ユーザーIDを取得
    const userId = await UserModel.readUserForEmail(email);
    await sendEmail(
      email,
      `<a href="http://localhost:3000/register-user/${userId}">ユーザー情報入力</a>`
    )
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
    if (!user) {
      return {
        errors: [{
          field: 'register',
          message: '更新したユーザー情報の取得に失敗'
        }]
      }
    }

    return { 
      user: { 
        userId: userInput.userId, 
        userName: userInput.userName,
        email: '',
        professionId: userInput.professionId
      }
    }
  }

  @Mutation(() => Boolean)
  async update(
    @Arg('user') userInput: UserInput
  ): Promise<boolean> {
    return await UserModel.updateUser(userInput);
  }


  @Query(() => UserResponse)
  async login(
    @Arg('email') email: string, 
    @Arg('password') password: string
  ): Promise<UserResponse> {
    const user = await UserModel.loginUser(email);
    if (!user) {
      return {
        errors: [{
          field: 'email',
          message: '入力されたemailが存在しません'
        }]
      }
    }

    const valid = await argon2.verify(user.password, password);
    if (!valid) {
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