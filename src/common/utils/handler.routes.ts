import { Hono } from "hono";
import MainRouter from "../../core/routes/main.route";

export default function HandleRoutes(app: Hono) {
    MainRouter(app)
}