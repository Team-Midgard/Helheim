import { UserEntity } from "../../../../common/entities/user.entitiy";
import BaseRepository from "../../../../common/utils/base.repository";
import type userInterface from "../interface/user";

export default class CreateUser extends BaseRepository<UserEntity> {
    constructor() {
        super(UserEntity)
    }

    async createUser(userData: userInterface): Promise<userInterface> {
        const user = this.repository.create(userData);
        return await this.repository.save(user);
    }
}