import lerMangasInterface from "./interface/lermangas";
import GetManga from "./use-cases/get-mangas";
import GetMangaMostPopulars from "./use-cases/get-most-populars";
import SearchManga from "./use-cases/search-manga";

export default class MangaController {
    private getManga: GetManga;
    private getMostPopulars: GetMangaMostPopulars
    private searchManga: SearchManga

    constructor() {
        this.getManga = new GetManga();
        this.getMostPopulars = new GetMangaMostPopulars();
        this.searchManga = new SearchManga()
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
}
