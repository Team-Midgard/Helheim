import Config from "../../../../common/config/app.config";
import type lerMangasInterface from "../interface/lermangas";
import { load } from "cheerio";

const url = Config.api.url;

export default class InfoManga {

    async getMangas(query: string): Promise<lerMangasInterface[]> {
        const pageUrl = query;
        const response = await fetch(`${url}/manga/${pageUrl}`);

        const $ = load(await response.text());
        const data: lerMangasInterface[] = [];

        $('.wrap').each((_, element) => {
            const title = $(element).find('.rate-title').attr('title') || ''
            const imageUrl = $(element).find('.summary_image a img').attr('src') || ""
            const rating = $(element).find('.post-total-rating .score').text().trim().split(' ')[0];
            const typeManga = $(element).find('.summary-heading:contains("Tipo") + .summary-content').text().trim();

            const alternativeName = $(element).find('.summary-heading:contains("Nome alternativo") + .summary-content').text().trim();
            const genres = $(element).find('.summary-heading:contains("Gênero(s)") + .summary-content a')
                .map((_, genreElement) => $(genreElement).text().trim()).get();
            const status = $(element).find('.summary-heading:contains("Status") + .summary-content').text().trim();
            const releaseYear = $(element).find('.summary-heading:contains("Lançamento") + .summary-content a').text().trim();

            const chapters: { title: string; link: string; releaseDate?: string }[] = [];

            $(element).find('.main.version-chap .wp-manga-chapter').each((_, chapterElement) => {
                const chapterTitle = $(chapterElement).find('a').text().trim();
                const chapterLink = $(chapterElement).find('a').attr('href') ?? '';
                const releaseDate = $(chapterElement).find('.chapter-release-date i').text().trim();
                chapters.push({ title: chapterTitle, link: chapterLink, releaseDate });
            });

            const description = $(element).find('.manga-excerpt p').text().trim();

            data.push({
                title,
                description,
                imageUrl,
                typeManga,
                rating,
                alternativeName,
                genres,
                status,
                releaseYear,
                chapters,
            });
        });

        return data;
    }
}
