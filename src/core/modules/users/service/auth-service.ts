import { decode, sign, verify } from 'hono/jwt'
import Config from "../../../../common/config/app.config";
import ReadUser from '../use-cases/read-user';

export default class AuthService {
    private readUser: ReadUser

    constructor() {
        this.readUser = new ReadUser()
    }

    async singJwt(email: string): Promise<string> {
        const payload = {
            email: email,
            exp: Math.floor(Date.now() / 1000) + 60 * 60
        }

        const secret = Config.secret
        const token = sign(payload, secret, "HS256")
        return token
    }

    async verifyJwt(jwt: string) {
        const secret = Config.secret
        const decodeJwt = await verify(jwt, secret, "HS256")
        return decodeJwt
    }

    async decodeJwt(jwt: string) {
        const token = jwt
        const { header, payload } = decode(token)
        return { header, payload }
    }
}   