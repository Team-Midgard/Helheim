import type { Context, Hono } from "hono";
import UserController from "../modules/users/user.controller";

const UserRouter = (app: Hono) => {
    const newUser = new UserController();

    app.post('/users', async (c) => {
        const user = await c.req.json()
        try {
            const mangaList = await newUser.userCreate(user);
            return c.json(mangaList);
        } catch (error) {
            return c.json({ message: "Error creating user", error: error }, 500);
        }
    });
}

export default UserRouter