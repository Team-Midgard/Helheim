import type userInterface from "./interface/user";
import CreateUser from "./use-cases/create-user";

export default class UserController {
    private createUser: CreateUser

    constructor() {
        this.createUser = new CreateUser()
    }

    async userCreate(userData: userInterface) {
        return await this.createUser.createUser(userData);
    }
}