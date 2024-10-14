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

        $('.summary_content_wrap').each((_, element) => {
            const title = $(element).find('.post-title a').text().trim();
            const link = $(element).find('.post-title a').attr('href');
            const imageUrl = $(element).find('.summary_image img').attr('src');
            const rating = $(element).find('.score').text().trim();

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
                link,
                imageUrl,
                rating,
                alternativeName,
                genres,
                status,
                releaseYear,
                chapters,
                description
            });
        });

        $('.page-content-listing .wp-manga-chapter').each((_, element) => {
            const chapterTitle = $(element).find('a').text().trim();
            const chapterLink = $(element).find('a').attr('href');
            const releaseDate = $(element).find('.chapter-release-date i').text().trim();

            data.push({
                title: chapterTitle,
                link: chapterLink,
                releaseDate,
            });
        });

        return data;
    }
}
