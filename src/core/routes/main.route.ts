import { Context, Hono } from "hono";

const MainRouter = (app: Hono) => {
    app.get("/", (ctx: Context) => {
        return ctx.text("Hello World")
    })
}

export default MainRouter