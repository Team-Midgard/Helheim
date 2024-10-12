import AuthService from "../service/auth-service";

export default class UserInfo {
    private authService: AuthService

    constructor() {
        this.authService = new AuthService()
    }

    async userProfile(jwt: string): Promise<string> {
        const verify = await this.authService.verifyJwt(jwt);
        const userEmail = verify.email
        return String(userEmail)
    }

}   