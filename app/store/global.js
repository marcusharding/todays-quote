// MODULES
import { defineStore } from 'pinia';

// QUERIES
import { siteSettingsQuery } from '~/queries/global/site-settings';

export const useGlobalStore = defineStore('global', {
    state: () => ({ siteSettings: undefined }),
    actions: {
        setNavOpen(value) {
            this.navOpen = value;
        },

        async fetchData(query) {
            try {
                const { $sanity } = useNuxtApp();

                if (!$sanity) {
                    console.error('$sanity is not defined');
                    return {};
                }

                const result = await $sanity.fetch(query());
                return result || {};
            } catch (error) {
                console.error(`Error fetching data: ${error.message}`);
                return {};
            }
        },
        async fetchSiteSettings() {
            this.siteSettings = await this.fetchData(siteSettingsQuery);
        }
    }
});
