import { decode, sign, verify } from 'hono/jwt'
import Config from "../../../../common/config/app.config";

export default class AuthService {
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
        const { header, payload } = decode(jwt)
        return { header, payload }
    }
}   