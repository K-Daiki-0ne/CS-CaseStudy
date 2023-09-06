import { AppDataSource } from "../config/data-source"
import { User } from "../entity/User";

export class UserModel {
    public createUser() {
          
    }
    
    public async readUser(username: string, password: string) {
        const findUser = await AppDataSource
            .getRepository(User)
            .createQueryBuilder('user')
            .where('user.username = :username ', {username: username})
            .where('user.password = :password ', {password: password})
            .getOne()
        
        if(findUser?.userId == 0) {
           return; 
        }
        return findUser;
    }

    public async updateUser() {

    }

    public async deleteUser() {

    }
}