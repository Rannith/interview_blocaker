import { Model, Types } from "mongoose"
import { IUser } from "../model/user"

class UserRepository {
    public registerUser = async (user: IUser & { _id: Types.ObjectId }) => {
        const dbResult = await user.save()

        return dbResult
    }

    public getAllUser =async (User: Model<IUser, {}, {}, {}, any>) => {
        const dbResult = await User.find()

        return dbResult
    }
}

export default UserRepository