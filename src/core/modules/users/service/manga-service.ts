import Config from "../../../../common/config/app.config";
import { UserEntity } from "../../../../common/entities/user.entitiy";
import BaseRepository from "../../../../common/utils/base.repository";
import UserInfo from "../mapper/user-info";
import AuthService from "./auth-service";

export default class MangaService extends BaseRepository<UserEntity> {
    private authService: AuthService;
    private userInfo: UserInfo;

    constructor() {
        super(UserEntity);
        this.authService = new AuthService();
        this.userInfo = new UserInfo();
    }

    async setFavorite(jwt: string, mangaSlug: string) {
        const verified = await this.authService.verifyJwt(jwt);
        if (!verified) throw new Error("Token inválido");

        const user = await this.userInfo.userProfile(jwt);
        if (!user) throw new Error("User not found");
        if (!user.favorites) user.favorites = [];
        if (user.favorites.some(fav => fav.slug === mangaSlug)) {
            throw new Error("Manga already in favorites");
        }

        user.favorites.push({ slug: mangaSlug });

        await this.repository.save(user);
        return user.favorites;
    }

    async getFavorites(jwt: string) {
        const verified = await this.authService.verifyJwt(jwt);
        if (!verified) throw new Error("Token inválido");

        const user = await this.userInfo.userProfile(jwt);
        if (!user) throw new Error("User not found");

        return user.favorites || []; 
    }
}
