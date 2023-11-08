<template>
    <NuxtLink :to="`/products/${product.slug}`" class="w-full" v-for="product in products" :key="product.id">
        <template v-if="product.thumbnail">
            <img :src="product.thumbnail" alt="" class="w-full object-contain h-60 rounded-xl mb-1" />
        </template>
        <template v-else>
            <img :src="product.images[0]" alt="" class="w-full object-contain h-60 rounded-xl mb-1" />
        </template>
        <div class="px-4 py-2 border border-gray-100 rounded-xl space-y-1">
            <h3 class="text-zinc-800 font-semibold">{{ product.title }}</h3>
            <p class="text-xs text-zinc-500">{{ product.product_category.title }}</p>
            <p class="text-zinc-800 text-sm font-semibold">₹{{ product.price }}</p>
        </div>
    </NuxtLink>
</template>

<script setup>

</script>

<style scoped>

</style>