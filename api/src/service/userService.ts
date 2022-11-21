import UserRepository from '../repository/userRepository';
import User from '../model/user'

class UserService {
    userRepository: UserRepository
    constructor() {
        this.userRepository = new UserRepository()
    }

    public registerUser = async (userPayload: Object) => {
        const user = new User(userPayload)

        const registerUser = await this.userRepository.registerUser(user)

        return registerUser
    }

    public getAllUser =async () => {
        const getAllUser = await this.userRepository.getAllUser(User)

        return getAllUser
    }
}

export default UserService