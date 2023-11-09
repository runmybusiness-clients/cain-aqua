<template>
  <nav class='bg-white w-full py-2 border-b border-gray-200'>
    <div class='px-4 flex justify-between max-w-5xl w-full mx-auto'>
      <div class='logo flex gap-3 items-center'>
        <img src="/images/logo.jpeg" alt="cainaqua-logo" class="h-14 w-full object-contain" />
      </div>
      <div class='flex items-center gap-2 text-zinc-900'>
        <NuxtLink :prefetch="false" to="/" class='rounded px-3 py-1 text-sm'>Home</NuxtLink>
        <NuxtLink :prefetch="false" to="/about" class='rounded px-3 py-1 text-sm'>About</NuxtLink>
        <NuxtLink :prefetch="false" to='/products' class='rounded px-3 py-1 text-sm'>Products</NuxtLink>
        <NuxtLink :prefetch="false" to="/contact" class='rounded px-3 py-1 text-sm'>Contact</NuxtLink>
      </div>
    </div>
  </nav>
  <!-- quick nav links -->
  <div class="flex items-center gap-10 justify-center text-sm bg-gray-800  text-gray-100 font-semibold py-2">
    <NuxtLink :prefetch="false" 
      v-for="category in categories" 
      :key="category.id"
      :to="`/category/${category.slug}`" 
      class=""
    >{{ category.title }}</NuxtLink>
  </div>
</template>

<script setup>
  const supabase = useSupabaseClient();
  
  const { data: categories } = await supabase.from('product_category')
    .select('id, title, created_at, slug')
    .order('id', { ascending : true})
    .range(0, 5)

</script>

<style>

</style>