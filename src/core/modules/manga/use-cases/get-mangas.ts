import Config from "../../../../common/config/app.config";
import type lerMangasInterface from "../interface/lermangas";
import { load } from "cheerio";

const url = Config.api.url;

export default class GetManga {

    async getMangas(pages: number): Promise<lerMangasInterface[]> {
        if (pages <= 0) throw new Error("Navegação inválida");
        const pagesUrl = pages === 1 ? url : `${url}/page/${pages}`;
        const response = await fetch(pagesUrl);

        const $ = load(await response.text());
        const data: lerMangasInterface[] = [];

        $('.page-item-detail.manga').each((_, element) => {
            const title = $(element).find('.post-title a').text().trim();
            const link = $(element).find('.item-thumb a').attr('href');
            const imageUrl = $(element).find('.item-thumb img').attr('src');
            const rating = $(element).find('.score').text().trim();

            const chapters: { title: string; link: string }[] = [];
            $(element).find('.list-chapter .chapter-item').each((_, chapterElement) => {
                const chapterTitle = $(chapterElement).find('.chapter a').text().trim();
                const chapterLink = $(chapterElement).find('.chapter a').attr('href') ?? '';
                chapters.push({ title: chapterTitle, link: chapterLink });
            });

            data.push({ title, link, imageUrl, rating, chapters });
        });

        return data;
    }
}
