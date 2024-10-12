import Config from "../../../../common/config/app.config";
import type lerMangasInterface from "../interface/lermangas";
import { load } from "cheerio";

const url = Config.api.url;

export default class GetMangaMostPopulars {

    async getMostPopulars(): Promise<lerMangasInterface[]> {
        const response = await fetch(url);
        if (!response) throw new Error("Not found");
    
        const $ = load(await response.text());
        const data: lerMangasInterface[] = [];

        $('.popular-item-wrap').each((_, element) => {
            const title = $(element).find('.widget-title a').text().trim();
            const link = $(element).find('.widget-title a').attr('href') || '';
            const imageUrl = $(element).find('.popular-img img').attr('src') || '';

            const chapters: { title: string; link: string }[] = [];
            $(element).find('.list-chapter .chapter-item').each((_, chapterElement) => {
                const chapterTitle = $(chapterElement).find('.chapter a').text().trim();
                const chapterLink = $(chapterElement).find('.chapter a').attr('href') || '';
                chapters.push({ title: chapterTitle, link: chapterLink });
            });

            data.push({ title, link, imageUrl, chapters, rating: 'N/A' }); 
        });

        return data;
    }

}
