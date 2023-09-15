import { Repository } from 'typeorm'
import { AppDataSource } from "../config/data-source"
import { User } from "../entity/User";

type CreateUserType = {
  userId: string;
  userName: string;
  password: string;
  professionId?: string;
}

class UserModel {
  private userRepo: Repository<User>

  constructor() {
    this.userRepo = AppDataSource.getRepository(User);
  }

  // キー情報からユーザーを作成する
  // 登録用のメール送信後に自動でユーザーを作成する
  public async createUser(email: string) {
    const repo = AppDataSource.getRepository(User);

    try {
      await repo.insert({ 
        email: email, 
        userName: '', 
        password: '', 
        professionId: '', 
        age: 0 
      })

      console.log('ユーザーの作成に成功しました')
    } catch (e) {
      // 入力されたemailがすでに存在する場合はエラーとする
      if (e.errno == 1062) {
        return false;
      }
    }

    return true;
  }

  public async readUserForEmail(email: string): Promise<string> {
    if (email == '') return '';
    
    const user: User | null = await this.userRepo.findOne({
      where: {
        email: email
      }
    })

    if (!user) return '';

    return user.userId;
  }

  public async readUser(userId: string): Promise<boolean> {
    const user = await this.userRepo.findOne({
      where: {
        userId: userId
      }
    })

    if (user == null) {
      return false
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
      await repo.update({ userId: user.userId }, {
        userName: user.userName,
        password: user.password,
        professionId: user.professionId
      });  
    } catch(e) {
      console.error('ユーザー情報の更新に失敗:', e);
      return false;
    }

    return true;
  }
    
  public async loginUser(email: string) {
    const user = await this.userRepo.findOne({
      where: {
        email: email
      }
    })

    return user;
  }

}

export default new UserModel;