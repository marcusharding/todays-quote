<template>
    <div class="index container site-content-container">
        <p>{{ quoteOfTheDay?.quote }}</p>
    </div>
</template>

<script setup>
// QUERIES
import { homepageQuery } from '~/queries/pages/homepage';
import { metaQuery } from '~/queries/helpers/pageMeta';

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

    if (!data.value || data.value.length === 0) return null;

    const today = new Date();

    const dayOfYear = Math.floor(
        (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
    );

    const quoteIndex = dayOfYear % data.value.length;
    return data.value[quoteIndex];
});

</script>

<style lang="scss" scoped>

.index.container {
    height: 100vh;
    height: 100dvh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
}

.index p {
    @include typography('heading-4');
    font-weight: 500;
}

</style>