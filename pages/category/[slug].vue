<template>
    <div class="h-[calc(100vh-176px)]">
        <div class="max-w-5xl mx-auto py-12 grid grid-cols-4 gap-5">
        <template v-if="products">
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
        <template v-else>
            <div class="skeleton">
            <USkeleton class="h-60 w-full" />
            <USkeleton class="h-4 mt-3 w-full" />
            <USkeleton class="h-4 mt-3 w-[80%]" />
            <USkeleton class="h-4 mt-3 w-[50%]" />
            </div>
        </template>
        </div>
    </div>
</template>

<script setup>
    definePageMeta({
        colorMode: 'light'
    })

    const supabase = useSupabaseClient();
    const route = useRoute();

    const category = ref(null)
    const products = ref([])

    const fetchCategoryDetails = async () => {
        await supabase
            .from('product_category')
            .select('id, slug')
            .eq('slug', route.params.slug)
            .single()
            .then((res) => {
                category.value = res.data
                getFeaturedProduct()
            })
    }

    const getFeaturedProduct = async () => {
        await supabase.from('products')
            .select(`
                id, title, slug, price, images,
                product_category(
                    id, title
                )
            `)
            .order('id', { ascending : false})
            .eq('category_id', category.value.id)
            .range(0, 19)
            .then((res) => {
                const data = res.data
                if (data === null) {
                    products.value = []
                    return
                }
                products.value = data
            })
    }

    fetchCategoryDetails()

</script>

<style scoped>

</style>