import type { Hono } from "hono";
import MainRouter from "../../core/routes/main.route";
import MangaRouter from "../../core/routes/manga.route";
import UserRouter from "../../core/routes/user.route";

export default function HandleRoutes(app: Hono) {
    MainRouter(app)
    MangaRouter(app)
    UserRouter(app)
}