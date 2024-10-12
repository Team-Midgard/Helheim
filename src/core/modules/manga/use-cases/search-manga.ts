import Config from "../../../../common/config/app.config";
import type lerMangasInterface from "../interface/lermangas";
import { load } from "cheerio";

const url = Config.api.url;

export default class SearchManga {

    async searchManga(pages: number, query: string): Promise<lerMangasInterface[]> {
        if (pages <= 0) throw new Error("Navegação inválida");
        const pagesUrl = `${url}page/${pages}/?s=${query}&post_type=wp-manga`;
        const response = await fetch(pagesUrl);

        const $ = load(await response.text());
        const data: lerMangasInterface[] = [];

        $('.c-tabs-item__content').each((_, element) => {
            const title = $(element).find('.post-title a').text().trim();
            const link = $(element).find('.post-title a').attr('href');
            const imageUrl = $(element).find('.tab-thumb img').attr('src');
            const rating = $(element).find('.score').text().trim();
            const genres = $(element).find('.mg_genres .summary-content').html()
                ?.replace(/<a[^>]*>(.*?)<\/a>/g, '$1').split(', ').map(g => g.trim());

            const alternativeName = $(element).find('.mg_alternative .summary-content').text().trim();
            const status = $(element).find('.mg_status .summary-content').text().trim();
            const releaseYear = $(element).find('.mg_release .summary-content a').text().trim();

            const chapters: { title: string; link: string }[] = [];
            $(element).find('.latest-chap .chapter').each((_, chapterElement) => {
                const chapterTitle = $(chapterElement).find('a').text().trim();
                const chapterLink = $(chapterElement).find('a').attr('href') ?? '';
                chapters.push({ title: chapterTitle, link: chapterLink });
            });

            data.push({
                title,
                link,
                imageUrl,
                rating,
                alternativeName,
                genres,
                status,
                releaseYear,
                chapters
            });
        });

        return data;
    }
}
