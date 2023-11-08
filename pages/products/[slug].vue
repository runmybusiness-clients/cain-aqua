<template>
    <div class="max-w-6xl mx-auto py-5" v-if="product">
        <section class="flex w-full">
            <section class="w-[40%] overflow-hidden">
                <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide" class="border-x border-t">
                    <Slide v-for="slide in product.images" :key="slide">
                        <img :src="slide" alt="" class="w-full max-h-[50vh]  h-full object-contain">
                    </Slide>
                </Carousel>
                <Carousel
                    id="thumbnails"
                    :items-to-show="4"
                    :wrap-around="false"
                    v-model="currentSlide"
                    ref="carousel"
                >
                    <Slide v-for="(slide, index) in product.images" :key="slide" class="border">
                        <button class="carousel__item p-2" @click="slideTo(index)">
                            <img :src="slide" alt="" class="w-16 h-16">
                        </button>
                    </Slide>
                </Carousel>
            </section>

            <!-- Product Details -->
            <section class="w-[60%]">
                <div class="px-5">
                    <div class="breadcrumbs flex items-center gap-2 text-xs text-zinc-500">
                        <span>Home</span>
                        <span>/</span>
                        <span>Products</span>
                        <span>/</span>
                        <span class="font-semibold">{{ product.title }}</span>
                    </div>
                    <h2 class="mt-4 mb-3">
                        <span class="text-xs bg-cyan-200/25 text-cyan-600 border border-cyan-400 px-3 py-1 rounded-lg">{{ product.product_category.title }}</span>
                    </h2>
                    <h1 class="text-2xl font-bold mb-1">{{ product.title }}</h1>
                    <h3 class="font-semibold">₹{{ product.price }}</h3>
                    <p class="mt-3 mb-6">{{ product.short_description }}</p>

                    <!-- Basic Details -->
                    <section>
                        <div class="flex border-x border-y w-[30vw] text-sm rounded-t">
                            <span class="border-r w-[15vw] px-2 py-2 font-semibold">Dimensions</span>
                            <span class="px-4 py-2 w-[15vw] text-zinc-600">{{ product.price }}</span>
                        </div>
                        <div class="flex border-x w-[30vw] border-b text-sm">
                            <span class="border-r w-[15vw] px-2 py-2 font-semibold">Product Weight</span>
                            <span class="px-4 py-2 w-[15vw] text-zinc-600">{{ product.item_weight }}</span>
                        </div>
                        <div class="flex border-x w-[30vw] border-b text-sm">
                            <span class="border-r w-[15vw] px-2 py-2 font-semibold">Model Number</span>
                            <span class="px-4 py-2 w-[15vw] text-zinc-600">{{ product.model_number }}</span>
                        </div>
                        <div class="flex border-x w-[30vw] border-b text-sm rounded-b">
                            <span class="border-r w-[15vw] px-2 py-2 font-semibold">Color</span>
                            <span class="px-4 py-2 w-[15vw] text-zinc-600">{{ product.color }}</span>
                        </div>
                    </section>
                </div>
            </section>
        </section>

        <!-- Long Description -->
        <section class="mt-12">
            <h2 class="mb-6 border-b pb-2">
                <span class="border-b-4 pb-2 px-3 border-zinc-600">Description</span>
            </h2>
            <div class="tiptap" v-html="product.long_description"></div>
        </section>

        <!-- Related Products -->
        <section class="mt-12" v-if="relatedproducts === 0">
            <h3>Related Products</h3>
            <div class="grid grid-cols-4 gap-5">
                <NuxtLink :to="`/products/${product.slug}`" class="w-full" v-for="product in relatedproducts" :key="product.id">
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
            </div>
        </section>
    </div>
    
</template>

<script setup>
    import { Carousel, Slide } from 'vue3-carousel'
    import 'vue3-carousel/dist/carousel.css'

    definePageMeta({
        colorMode: 'light'
    })

    const currentSlide = ref(0)

    const route = useRoute()
    const supabase = useSupabaseClient();

    const product = ref(null)
    const relatedproducts = ref([])

    async function fetchData() {
        await supabase
            .from('products')
            .select(`
                *,
                product_category(
                    id, title
                )
            `)
            .eq('slug', route.params.slug)
            .single()
            .then((res) => {
                product.value = res.data
                fetchRelatedProduct()
            })
    }
    fetchData()

    // Fetch related Produc
    const fetchRelatedProduct = async() => {
        await supabase
            .from('products')
            .select(`
                id, title, price, slug, images,
                product_category(
                    id, title
                )
            `)
            .eq('category_id', product.value.category_id)
            .neq('id', product.value.id)
            .range(0, 3)
            .then((res) => {
                relatedproducts.value = res.data
            })
    }
            

    function slideTo(val) {
        currentSlide.value = val
    }
</script>

<style>

</style>