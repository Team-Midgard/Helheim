import { load } from "cheerio";
import Config from "../../../../common/config/app.config";

const url = Config.api.url
export default class GetImagesManga {

    async getImagesManga(query: string): Promise<{ [index: number]: string }> {
        const pagesUrl = query;
        const response = await fetch(`${url}/manga/${pagesUrl}`);
        // https://lermangas.me/manga/mago-do-infinito/capitulo-82/
        if (!pagesUrl) throw new Error("URL não fornecida");
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
