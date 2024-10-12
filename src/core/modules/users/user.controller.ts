import type userInterface from "./interface/user";
import AccountUser from "./use-cases/account-user";
import CreateUser from "./use-cases/create-user";
import DeleteUser from "./use-cases/delete-user";
import ReadUser from "./use-cases/read-user";
import UpdateUser from "./use-cases/update-user";

export default class UserController {
    private createUser: CreateUser
    private deleteUser: DeleteUser
    private updateUser: UpdateUser
    private readUser: ReadUser
    private loginuser: AccountUser

    constructor() {
        this.createUser = new CreateUser()
        this.deleteUser = new DeleteUser()
        this.updateUser = new UpdateUser()
        this.readUser = new ReadUser()
        this.loginuser = new AccountUser()
    }

    async userCreate(userData: userInterface) {
        return await this.createUser.createUser(userData);
    }

    async userDelete(userId: number) {
        return await this.deleteUser.deleteUser(userId);
    }

    async userUpdate(userId: number, userData: Partial<userInterface>) {
        return await this.updateUser.updateUser(userId, userData);
    }

    async findOneById(userId: number) {
        return await this.readUser.findOneById(userId);
    }

    async findOneByEmail(userEmail: string) {
        return await this.readUser.findOneByEmail(userEmail);
    }

    async findAllByUsername(userName: string) {
        return await this.readUser.findAllByUsername(userName);
    }

    async userLogin(email: string, password: string) {
        return await this.loginuser.loginUser(email, password);
    }

    async verifyToken(jwt: string) {
        return await this.loginuser.verifyToken(jwt);
    }

    async decodeToken(jwt: string) {
        return await this.loginuser.decodeToken(jwt);
    }
}