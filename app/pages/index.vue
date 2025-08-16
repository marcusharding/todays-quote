<template>
    <div class="index container site-content-container">
        <p>{{ quoteOfTheDay?.quote }}</p>
    </div>
</template>

<script setup>
// QUERIES
import { homepageQuery } from '~/queries/pages/homepage';
import { metaQuery } from '~/queries/helpers/pageMeta';
import { onMounted } from 'vue';

// DATA
const { data, error: dataError } = await useSanityQuery(homepageQuery);
const { data: meta, error: metaError } = await useSanityQuery(metaQuery('homepage'));

if (dataError.value) {
    console.error('Error fetching page data:', dataError.value);
}

if (metaError.value) {
    console.error('Error fetching meta data:', metaError.value);
}

// META
useMeta(meta?.value?.metaData, data?.value);

// METHODS
const quoteOfTheDay = computed(() => {
    const list = data.value || [];
    if (!list.length) return undefined;

    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Toronto',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    }).formatToParts(new Date());

    const y = Number(parts.find((p) => p.type === 'year').value);
    const m = Number(parts.find((p) => p.type === 'month').value) - 1;
    const d = Number(parts.find((p) => p.type === 'day').value);
    const startOfYearUTC = Date.UTC(y, 0, 0);
    const todayUTC = Date.UTC(y, m, d);
    const dayOfYear = Math.floor((todayUTC - startOfYearUTC) / (1000 * 60 * 60 * 24));

    return list[dayOfYear % list.length];
});

const setVh = () => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
};

onMounted(() => {
    setVh();
    window.addEventListener('resize', setVh);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', setVh);
});
</script>

<style lang="scss" scoped>
.index.container {
    height: 100dvh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
}

.index p {
    @include typography('heading-6');

    @include laptop-up {
        @include typography('heading-4');
    }
}
</style>
