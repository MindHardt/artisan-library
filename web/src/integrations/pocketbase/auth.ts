import { createServerFn } from "@tanstack/react-start";
import { deleteCookie, getCookie, setCookie } from "@tanstack/react-start/server";
import { AsyncAuthStore } from 'pocketbase';
import z from "zod";

const COOKIE_NAME = "auth_token";
const COOKIE_OPTIONS: Exclude<Parameters<typeof setCookie>[2], undefined> = {
    expires: new Date(Number.MAX_SAFE_INTEGER),
    sameSite: 'strict',
    httpOnly: true,
    path: '/_serverFn/'
};

const save = createServerFn({ method: 'POST' })
    .validator(z.object({
        token: z.string().nonempty()
    }))
    .handler(async ({ data: { token } }) => {
        setCookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    });

const load = createServerFn({ method: 'GET' })
    .handler(async () => {
        const token = getCookie(COOKIE_NAME);
        return { token };
    });

const clear = createServerFn({ method: 'POST' })
    .handler(async () => {
        deleteCookie(COOKIE_NAME);
    });

export default function createAuthStore() {
    return new AsyncAuthStore({
        initial: load().then(x => x.token),
        save: async (token) => save({ data: { token } }),
        clear
    });
}