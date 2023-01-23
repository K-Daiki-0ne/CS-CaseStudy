import { AppDataSource } from "../config/data-source"
import { User } from "../entity/User";

AppDataSource.initialize().then(async () => {

    const user = new User()
    user.firstName = "Timber"
    user.lastName = "Saw"
    user.age = 25
    await AppDataSource.manager.save(user)

    const users = await AppDataSource.manager.find(User);

    console.log('user info:', users);

}).catch(error => console.log(error))
