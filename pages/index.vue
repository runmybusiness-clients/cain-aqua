<template>
    <div class='flex flex-col w-full items-center shadow bg-white'>
        <!-- hero area -->
        <div class="hero-area w-full h-[85vh]">
            <img loading="lazy" src="/images/banner-bg.jpeg" class="h-full w-full object-cover">
        </div>

        <!-- Categories -->
        <section class="w-full py-16 hidden">
            <div class="max-w-5xl mx-auto">
                <div class="heading flex flex-col gap-3 justify-center items-center mb-12">
                    <h2 class="text-gray-800 font-semibold text-[2.5em] text-center">Categories</h2>
                    <span class="h-1 w-44 bg-gray-800"></span>
                </div>
                <div class="grid grid-cols-4 gap-5">
                    <figure v-for="category in categories" :key="category" class="shadow-inner border border-gray-100 rounded-xl">
                        <img loading="lazy" src="/images/pre.png" alt="" class="">
                        <h3 class="text-center font-semibold border-t border-gray-100 py-2 text-sm">{{ category.title }}</h3>
                    </figure>
                </div>
            </div>
        </section>

        <!-- About Us -->
        <section class="w-full h-screen flex items-center bg-gray-50">
            <div class="flex max-w-5xl mx-auto w-full gap-12">
                <div class="w-full">
                    <img loading="lazy" src="/images/1.png" alt="" class="w-full object-cover">
                </div>
                <div class="w-full space-y-6">
                    <h5 class="font-bold text-cyan-500">About Us</h5>
                    <h2 class="text-4xl font-bold text-gray-900">Safe Water Is Essential For Our Healthy Life</h2>
                    <p class="text-gray-700">We know that as water is the most essential element for all living beings, not only humans, and you have to take it regularly, you are efer searching for the best.</p>
                    <div class="grid grid-cols-2 gap-6">
                        <div class="flex items-start gap-4" v-for="n in 4">
                            <Icon class="text-cyan-400 w-7 h-7" name="mdi:checkbox-marked-circle-outline" />
                            <div class="text-zinc-800">Lorem ipsum dolor sit amet consectetur</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- What Water do for you -->
        <section class="w-full bg-gray-200">
            <div class="">
                <img loading="lazy" src="https://www.kent.co.in/blog/wp-content/uploads/2018/05/pH-level-in-drinking-water.jpg" alt="" class="w-full">
            </div>
        </section>

        <!-- Best Selling Product -->
        <section class="w-full py-16">
            <div class="max-w-5xl mx-auto">
                <div class="heading flex flex-col gap-3 justify-center items-center mb-12">
                    <h2 class="text-gray-800 font-semibold text-[2.5em] text-center">Featured Products</h2>
                    <span class="h-1 w-44 bg-gray-800"></span>
                </div>
                <div class="grid grid-cols-4 gap-6 w-full">
                    <NuxtLink :prefetch="false" :to="`/products/${product.slug}`" class="w-full" v-for="product in products" :key="product.id">
                        <template v-if="product.thumbnail">
                            <img loading="lazy" :src="product.thumbnail" alt="" class="w-full object-contain h-60 rounded-xl mb-1" />
                        </template>
                        <template v-else>
                            <img loading="lazy" :src="product.images[0]" alt="" class="w-full object-contain h-60 rounded-xl mb-1" />
                        </template>
                        <div class="px-4 py-2 border border-gray-100 rounded-xl space-y-1">
                            <h3 class="text-zinc-800 font-semibold">{{ product.title }}</h3>
                            <p class="text-xs text-zinc-500">{{ product.product_category.title }}</p>
                            <p class="text-zinc-800 text-sm font-semibold">₹{{ product.price }}</p>
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
    definePageMeta({
        colorMode: 'light'
    })

    const supabase = useSupabaseClient();

    const categories = ref([])
    const products = ref([])

    const getAllCategory = async () => {
        await supabase.from('product_category')
            .select('id, title, created_at, slug')
            .order('id', { ascending : false})
            .range(0, 3)
            .then((res) => {
                const data = res.data
                if (data === null) {
                    categories.value = []
                    return
                }
                categories.value = data
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
            .range(0, 3)
            .then((res) => {
                const data = res.data
                if (data === null) {
                    products.value = []
                    return
                }
                products.value = data
            })
    }
    getFeaturedProduct()
    getAllCategory()
</script>

<style>

</style>