import { UserEntity } from "../../../../common/entities/user.entitiy";
import BaseRepository from "../../../../common/utils/base.repository";
import type userInterface from "../interface/user";

export default class DeleteUser extends BaseRepository<UserEntity> {
    constructor() {
        super(UserEntity)
    }

    async deleteUser(userId: number): Promise<void> {
        const user = await this.repository.findOneBy({ id: userId });
        if (!user) throw new Error("User not found");
        await this.repository.delete(userId);
    }
}