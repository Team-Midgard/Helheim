import { UserEntity } from "../../../../common/entities/user.entitiy";
import BaseRepository from "../../../../common/utils/base.repository";
import type userInterface from "../interface/user";

export default class ReadUser extends BaseRepository<UserEntity> {
    constructor() {
        super(UserEntity)
    }

    async findOneById(userId: number): Promise<userInterface> {
        const user = await this.repository.findOneBy({ id: userId });
        if (!user) throw new Error("User not found");
        return user
    }

    async findOneByEmail(userEmail: string): Promise<userInterface | null> {
        const user = await this.repository.findOne({
            where: { email: userEmail }
        });
        return user;
    }

    async findAllByUsername(userName: string): Promise<userInterface[]> {
        const users = await this.repository.find({
            where: { username: userName }
        });
        if (users.length === 0) throw new Error("No users found");
        return users;
    }
}