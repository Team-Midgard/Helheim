import { UserEntity } from "../../common/entities/user.entitiy";
import BaseRepository from "../../common/utils/base.repository";

export class UserServices extends BaseRepository<UserEntity> {
    constructor() {
        super(UserEntity)
    }

}