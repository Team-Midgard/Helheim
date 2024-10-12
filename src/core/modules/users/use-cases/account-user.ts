import AuthService from "../service/auth-service";
import ReadUser from "./read-user";
import type userInterface from "../interface/user";

export default class AccountUser {
    private authServices: AuthService;
    private readUser: ReadUser;

    constructor() {
        this.readUser = new ReadUser();
        this.authServices = new AuthService();
    }

    async loginUser(email: string, password: string): Promise<string> {
        const user: userInterface | null = await this.readUser.findOneByEmail(email);

        if (!user) throw new Error("User not found");
        if (user.password !== password) throw new Error("Incorrect password");

        const token = await this.authServices.singJwt(String(user.email));
        return token;
    }

    async decodeToken(jwt: string) {
        const token = await this.authServices.decodeJwt(jwt);
        return token
    }

    async verifyToken(jwt: string) {
        const token = await this.authServices.verifyJwt(jwt);
        return token
    }
}
