import { useGlobalStore } from '~/store/global';

export default defineNuxtPlugin(async () => {
    const globalStore = useGlobalStore();

    await Promise.all([globalStore.fetchSiteSettings()]);
});
