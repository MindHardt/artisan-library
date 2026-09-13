import { createIsomorphicFn } from '@tanstack/react-start'
import z from 'zod'
import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { getCookies, setCookie, setResponseHeader } from '@tanstack/react-start/server'

const { VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY } = z.object({
    VITE_SUPABASE_URL: z.url(),
    VITE_SUPABASE_PUBLISHABLE_KEY: z.string().nonempty(),
}).parse(import.meta.env);

export const supabaseClient = createIsomorphicFn()
    .client(() => createBrowserClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY))
    .server(() => createServerClient(VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY,
        {
            cookies: {
                getAll() {
                    return Object.entries(getCookies()).map(([name, value]) => ({ name, value }))
                },
                setAll(cookies, headers) {
                    cookies.forEach(({ name, value, options }) => {
                        setCookie(name, value, options)
                    })
                    Object.entries(headers).forEach(([name, value]) => {
                        setResponseHeader(name, value)
                    })
                },
            },
        }
    ));