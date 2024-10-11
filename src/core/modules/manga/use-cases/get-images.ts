import { load } from "cheerio";
export default class GetImagesManga {
    constructor() { }

    async getImagesManga(query: string): Promise<{ [index: number]: string }> {
        const pagesUrl = query;
        if (!pagesUrl) throw new Error("URL não fornecida");

        const response = await fetch(pagesUrl);
        if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);

        const $ = load(await response.text());
        const images: { [index: number]: string } = {};

        $('.page-break.no-gaps img').each((index, element) => {
            let imageUrl = $(element).attr('src');
            if (imageUrl) {
                imageUrl = imageUrl.trim();
                images[index] = imageUrl;
            }
        });

        if (Object.keys(images).length === 0) {
            throw new Error("Nenhuma imagem encontrada na página.");
        }

        return images;
    }
}
