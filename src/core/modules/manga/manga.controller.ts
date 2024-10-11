import lerMangasInterface from "./interface/lermangas";
import GetImagesManga from "./use-cases/get-images";
import GetManga from "./use-cases/get-mangas";
import GetMangaMostPopulars from "./use-cases/get-most-populars";
import InfoManga from "./use-cases/info-manga";
import SearchManga from "./use-cases/search-manga";

export default class MangaController {
    private getManga: GetManga;
    private getMostPopulars: GetMangaMostPopulars
    private searchManga: SearchManga
    private mangaInfo: InfoManga
    private mangaImages: GetImagesManga

    constructor() {
        this.getManga = new GetManga();
        this.getMostPopulars = new GetMangaMostPopulars();
        this.searchManga = new SearchManga()
        this.mangaInfo = new InfoManga()
        this.mangaImages = new GetImagesManga()
    }

    async getAllManga(pages: number = 1) {
        return await this.getManga.getMangas(pages);
    }

    async mostPopulars() {
        return await this.getMostPopulars.getMostPopulars();
    }

    async searchMangas(pages: number = 1, query: string) {
        return await this.searchManga.searchManga(pages, query);
    }

    async infoManga(query: string) {
        return await this.mangaInfo.getMangas(query);
    }

    async getMangaImages(query: string) {
        return await this.mangaImages.getImagesManga(query);
    }
}
