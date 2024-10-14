import type { Hono } from "hono";
import UserController from "../modules/users/user.controller";
import Config from "../../common/config/app.config";
import { jwt } from "hono/jwt";

import {
    getCookie,
    getSignedCookie,
    setCookie,
    setSignedCookie,
    deleteCookie,
} from 'hono/cookie'

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
        const { email, password } = await c.req.json();
        try {
            const userData = await newUser.userLogin(email, password);
            const token = userData

            await setSignedCookie(
                c,
                'token',
                token,
                Config.secret,
                {
                    path: '/',
                    secure: false,
                    httpOnly: true,
                    maxAge: 1000,
                    expires: new Date(Date.now() + 1000 * 60 * 60),
                    sameSite: 'Strict',
                }
            );
            return c.json({
                message: "User logged successfully",
            })
        } catch (error) {
            return c.json({ message: "Error login user", error: error }, 500);
        }
    });

    app.get("/user/profile", async (c) => {
        try {
            const token = await getSignedCookie(c, Config.secret, 'token');
            if (!token) throw new Error("Token not found");

            const verified = await newUser.verifyJwt(String(token));
            if (!verified) throw new Error("Invalid token");

            const userProfile = await newUser.userProfile(String(token));
            return c.json(userProfile);
        } catch (error) {
            return c.json({ message: "Error fetching user", error: error instanceof Error ? error.message : "Unknown error" }, 500);
        }
    });

}

export default UserRouter