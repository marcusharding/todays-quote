import { useGlobalStore } from '~/store/global';

export const useMeta = () => {
    const globalStore = useGlobalStore();
    const image = globalStore?.siteSettings?.metaImage?.url || '';
    const title = globalStore?.siteSettings?.metaTitle || '';
    const description = globalStore?.siteSettings?.metaDescription || '';

    useHead({
        title,
        meta: [
            { name: 'description', content: description },
            { property: 'og:title', content: title },
            { property: 'og:description', content: description },
            { property: 'og:image', content: image },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:image', content: image }
        ]
    });
};
