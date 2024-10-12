import type { Hono } from "hono";
import UserController from "../modules/users/user.controller";

const UserRouter = (app: Hono) => {
    const newUser = new UserController();

    app.post('/users', async (c) => {
        const user = await c.req.json()
        try {
            const userData = await newUser.userCreate(user);
            return c.json(userData);
        } catch (error) {
            return c.json({ message: "Error creating user", error: error }, 500);
        }
    });

    app.delete('/users/:id', async (c) => {
        const userId = Number(c.req.param('id'));
        try {
            await newUser.userDelete(userId);
            return c.json({ message: "User deleted successfully" });
        } catch (error) {
            return c.json({ message: "Error deleting user", error: error }, 500);
        }
    })

    app.put('/users/:id', async (c) => {
        const userId = Number(c.req.param('id'));
        const userData = await c.req.json();
        try {
            const user = await newUser.userUpdate(userId, userData);
            return c.json(user);
        } catch (error) {
            return c.json({ message: "Error updating user", error: error }, 500);
        }
    })

    app.get('/users/id/:id', async (c) => {
        const userId = Number(c.req.param('id'));
        try {
            const userData = await newUser.findOneById(userId);
            return c.json(userData);
        } catch (error) {
            return c.json({ message: "Error fetching user", error: error }, 500);
        }
    })

    app.get('/users/name/:user', async (c) => {
        const userName = String(c.req.param('user'));
        try {
            const userData = await newUser.findAllByUsername(userName);
            return c.json(userData);
        } catch (error) {
            return c.json({ message: "Error fetching users", error: error }, 500);
        }
    })

    app.get('/users/email/:email', async (c) => {
        const userEmail = String(c.req.param('email'));
        try {
            const userData = await newUser.findOneByEmail(userEmail);
            return c.json(userData);
        } catch (error) {
            return c.json({ message: "Error searching users", error: error }, 500);
        }
    })

    app.post("/users/login", async (c) => {
        try {
            const { email, password } = await c.req.json();
            const userData = await newUser.userLogin(email, password);
            return c.json(userData);
        } catch (error) {
            return c.json({ message: "Error login user", error: error }, 500);
        }
    });
}

export default UserRouter