import type userInterface from "../interface/user";
import ReadUser from "../use-cases/read-user"; // Remova 'type' para instanciar a classe
import AuthService from "../service/auth-service";

export default class UserInfo {
    private authService: AuthService;
    private readUser: ReadUser;

    constructor() {
        this.authService = new AuthService();
        this.readUser = new ReadUser();
    }

    async userProfile(jwt: string): Promise<userInterface | null> {
        const verify = await this.authService.verifyJwt(jwt);
        const userEmail = verify.email;
        const user = await this.readUser.findOneByEmail(String(userEmail));

        return user;
    }
}
