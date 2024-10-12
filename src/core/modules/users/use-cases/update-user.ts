import { UserEntity } from "../../../../common/entities/user.entitiy";
import BaseRepository from "../../../../common/utils/base.repository";
import type userInterface from "../interface/user";

export default class UpdateUser extends BaseRepository<UserEntity> {
    constructor() {
        super(UserEntity)
    }

    async updateUser(userId: number, userData: Partial<userInterface>): Promise<Partial<userInterface>> {
        const user = await this.repository.findOneBy({ id: userId });
        if (!user) throw new Error("User not found");
        const updatedUser = await this.repository.save({ ...user, ...userData });
        return updatedUser
    }
}