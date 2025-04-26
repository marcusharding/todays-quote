import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: process.env.FULLVIEWPORT_SANITY_STARTER_SANITY_ID,
    dataset: process.env.FULLVIEWPORT_SANITY_STARTER_SANITY_DATASET,
    useCdn: true,
    apiVersion: process.env.FULLVIEWPORT_SANITY_STARTER_SANITY_API_VERSION
});

export default defineNuxtConfig({
    runtimeConfig: {
        public: {
            FULLVIEWPORT_SANITY_STARTER_SANITY_ID:
                process.env.FULLVIEWPORT_SANITY_STARTER_SANITY_ID,
            FULLVIEWPORT_SANITY_STARTER_SANITY_DATASET:
                process.env.FULLVIEWPORT_SANITY_STARTER_SANITY_DATASET,
            FULLVIEWPORT_SANITY_STARTER_SANITY_API_VERSION:
                process.env.FULLVIEWPORT_SANITY_STARTER_SANITY_API_VERSION
        }
    },
    app: {
        head: {
            title: 'Todays Quote',
            htmlAttrs: { lang: 'en' },
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    name: 'format-detection',
                    content: 'telephone=no'
                }
            ],
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico'
                },
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/apple-touch-icon.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/favicon-32x32.png'
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/favicon-16x16.png'
                },
                {
                    rel: 'manifest',
                    href: '/site.webmanifest',
                    crossorigin: 'use-credentials'
                }
            ]
        }
    },

    generate: { fallback: true },

    sanity: {
        projectId: process.env.FULLVIEWPORT_SANITY_STARTER_SANITY_ID,
        dataset: process.env.FULLVIEWPORT_SANITY_STARTER_SANITY_DATASET,
        useCdn: process.env.NODE_ENV === 'production',
        apiVersion: process.env.FULLVIEWPORT_SANITY_STARTER_SANITY_API_VERSION || '2025-02-19',
        token: process.env.FULLVIEWPORT_SANITY_STARTER_SANITY_READ_TOKEN
    },

    gtag: {
        id: process.env.GOOGLE_ANALYTICS_ID,
        config: { anonymize_ip: true },
        debug: process.env.NODE_ENV !== 'production'
    },

    modules: [
        '@pinia/nuxt',
        '@nuxt/eslint',
        '@nuxtjs/sanity',
        '@nuxt/image',
        'nuxt-gtag',
        '@nuxtjs/sitemap',
        [
            '@nuxtjs/robots',
            {
                rules: [
                    { UserAgent: '*' },
                    { Disallow: ['/sandbox', '/404', '/error'] },
                    { Sitemap: 'https://todaysquote.net/sitemap.xml' }
                ]
            }
        ]
    ],

    plugins: [
        '~/plugins/sanity.js',
        '~/plugins/sanity-image-helper.js',
        '~/plugins/fetch-global-data.js'
    ],

    css: ['@/assets/scss/_normalize.scss', '@/assets/scss/global.scss'],

    vite: {
        logLevel: 'error',
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@use "@/assets/scss/mediaqueries" as *; @use "@/assets/scss/variables" as *;  @use "@/assets/scss/_typography" as *;',
                    api: 'modern-compiler'
                }
            }
        }
    },

    sitemap: { exclude: ['/sandbox', '/error', '/undefined'] },

    ssr: true,
    components: true,
    devtools: { enabled: true },
    compatibilityDate: '2025-02-15'
});
