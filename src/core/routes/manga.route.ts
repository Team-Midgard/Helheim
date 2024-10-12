import type { Hono } from "hono";
import MangaController from "../modules/manga/manga.controller";

const MangaRouter = (app: Hono) => {
    const newManga = new MangaController();

    app.get('/all-manga', async (c) => {
        const pageParam = c.req.query('page');
        const pages = pageParam ? Number(pageParam) : 1;

        try {
            const mangaList = await newManga.getAllManga(pages);
            return c.json(mangaList);
        } catch (error) {
            return c.json({ message: "Error fetching manga", error: error }, 500);
        }
    });

    app.get('/most-populars', async (c) => {
        try {
            const mangaList = await newManga.mostPopulars();
            return c.json(mangaList);
        } catch (error) {
            return c.json({ message: "Error fetching popular manga", error: error }, 500);
        }
    })

    app.get("/search", async (c) => {
        const pageParam = c.req.query('p');
        const query = String(c.req.query('q')); 
        const pages = Number(pageParam) || 1;
        try {
            const searchManga = await newManga.searchMangas(query, pages);
            return c.json(searchManga);
        } catch (error) {
            return c.json({ message: "Error fetching manga", error: error }, 500);
        }
    });
    

    app.get("/manga", async (c) => {
        const query = String(c.req.query('q'))
        try {
            const mangaInfo = await newManga.infoManga(query);
            return c.json(mangaInfo)
        } catch (error) {
            return c.json({ message: "Error fetching manga", error: error }, 500);
        }
    })

    app.get("/images", async (c) => {
        const query = String(c.req.query('q'))
        const mangaImages = await newManga.getMangaImages(query)
        return c.json(mangaImages)

    })
}

export default MangaRouter;
