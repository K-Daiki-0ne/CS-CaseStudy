import { AppDataSource } from "../config/data-source"
import { User } from "../entity/User";

type CreateUserType = {
  userId: string;
  userName: string;
  password: string;
  professionId: string;
}

type UpdateUserType = {
  userId: string;
  password?: string;
  userName?: string;
  email?: string;
  professionId?: string;
}

export class UserModel {
  // キー情報からユーザーを作成する
  // 登録用のメール送信後に自動でユーザーを作成する
  public async createUser(email: string) {
    const repo = AppDataSource.getRepository(User);

    if (email == '') return false;

    try {
      await repo.insert({email: email })
    } catch (e) {
      console.error('ユーザーの作成に失敗:', e);
      return false;
    }

    return true;
  }

  // ユーザー情報登録・パスワード再発行・ユーザー情報変更で使用する
  // パラメータから処理を分岐する
  public async updateUser(user: CreateUserType) {
    const repo = AppDataSource.getRepository(User);
    if (user == undefined) {
      return false;
    }

    try {
      // パスワードが入力された場合は変更のみであるため、パスワードのみを変更する
      if (user.password != '') {
        await repo.update({ userId: user.userId }, {
          password: user.password
        });
      } else {
        await repo.update({ userId: user.userId }, {
          userName: user.userName,
          password: user.password,
          professionId: user.professionId
        });  
      }
    } catch(e) {
      console.error('ユーザー情報の更新に失敗:', e);
      return false;
    }

    return true;
  }
    
  public async loginUser(email: string, password: string) {
    const findUser = await AppDataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email ', {email: email})
      .where('user.password = :password ', {password: password})
      .getOne()

    if (findUser == null) return;

    return {
      userId: findUser.userId,
      userName: findUser.userName,
    };
  }

}