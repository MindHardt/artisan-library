import Pocketbase from "pocketbase";
import { z } from "zod";
import createAuthStore from "./auth";

const { VITE_POCKETBASE_URL, POCKETBASE_URL } = z.object({
    VITE_POCKETBASE_URL: z.url(),
    POCKETBASE_URL: z.url().optional()
}).parse({ ...import.meta.env, ...process.env });

const url = POCKETBASE_URL || VITE_POCKETBASE_URL;
export default function pocketbaseClient() {
    return new Pocketbase(url, createAuthStore(), 'ru')
}
