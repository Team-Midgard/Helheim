import type { Hono } from "hono";
import MainRouter from "../../core/routes/main.route";
import MangaRouter from "../../core/routes/manga.route";

export default function HandleRoutes(app: Hono) {
    MainRouter(app)
    MangaRouter(app)
}