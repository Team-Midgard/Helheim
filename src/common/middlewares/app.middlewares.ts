import type { Hono } from "hono"
import { logger } from "hono/logger"
import { prettyJSON } from "hono/pretty-json"

export default function AppMiddlewares(app: Hono) {
    app.use(logger())
    app.use(prettyJSON())
}