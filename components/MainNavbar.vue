<template>
  <nav class='bg-white w-full py-2 border-b border-gray-200'>
    <div class='px-4 flex justify-between max-w-5xl w-full mx-auto'>
      <div class='logo flex gap-3 items-center'>
        <img src="/images/logo.jpeg" alt="cainaqua-logo" class="h-14 w-full object-contain" />
      </div>
      <div class='flex items-center gap-2 text-zinc-900'>
        <NuxtLink to="/" class='rounded px-3 py-1 text-sm'>Home</NuxtLink>
        <NuxtLink to="/about" class='rounded px-3 py-1 text-sm'>About</NuxtLink>
        <a href='#' class='rounded px-3 py-1 text-sm'>Products</a>
        <NuxtLink to="/contact" class='rounded px-3 py-1 text-sm'>Contact</NuxtLink>
      </div>
    </div>
  </nav>
  <!-- quick nav links -->
  <div class="flex items-center gap-10 justify-center text-sm bg-gray-800  text-gray-100 font-semibold py-2">
      <NuxtLink 
        v-for="category in categories" 
        :key="category.id"
        to="/" 
        class=""
      >{{ category.title }}</NuxtLink>
    </div>
</template>

<script setup>
  definePageMeta({
    colorMode: 'light'
  })

  const supabase = useSupabaseClient();

  const categories = ref([])
  
  const getAllCategory = async () => {
    const { data } = await supabase.from('product_category')
      .select('id, title, created_at, slug')
      .order('id', { ascending : true})
      .range(0, 5)
      .then((res) => {
          const data = res.data
          if (data === null) {
              categories.value = []
              return
          }
          categories.value = data
      })
  }
  getAllCategory()
</script>

<style>

</style>