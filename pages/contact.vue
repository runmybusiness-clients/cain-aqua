<template>
  <div class="h-full w-full bg-white max-w-5xl mx-auto py-12">
    <h2 class="text-6xl font-bold text-cyan-600 text-center mb-12">Contact Us</h2>
    <div class="flex w-full">
      <div class="w-full text-zinc-800"> 
        <h2 class="text-3xl font-bold">Questions, Comments? <br/> You tell us. We listen.</h2>
        <p class="my-7">Email: cainaquagroup@gmail.com</p>
        <p>Toll-free number: in Progress, <br/>
        Monday to Saturday – 9:00 am to 7:00 pm <br/>
        Sunday – 10:00 am to 5:00 pm</p>
        <p class="font-bold my-7">For Distributorship and Dealership enquiry <br/> 9915553482/9872840107</p>

        <h2 class="font-bold text-xl">Need Us? Call Us.</h2>
        <h2 class="font-bold text-3xl">9915553482</h2>
      </div>
      <div class="w-full space-y-4">
        <input type="text" placeholder="Name" class="w-full p-3 rounded border bg-white focus:outline-none" v-model="name">
        <input type="tel" placeholder="Phone Number" class="w-full p-3 rounded border bg-white focus:outline-none" v-model="contact">
        <input type="email" placeholder="Email" class="w-full p-3 rounded border bg-white focus:outline-none" v-model="email">
        <textarea rows="5" class="w-full p-3 rounded border bg-white focus:outline-none" placeholder="Message" v-model="message"></textarea>
        <button class="bg-cyan-600 text-white px-6 py-3 rounded" @click="sendForm">
          {{ loading ? 'Sending...' : 'Send Form' }}
          <Icon v-if="loading" name="line-md:loading-twotone-loop" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    colorMode: 'light'
  })

  const supabase = useSupabaseClient();
  const runtimeConfig = useRuntimeConfig()

  const name = ref('')
  const email = ref('')
  const contact = ref('')
  const message = ref('')

  const loading = ref(false)

  const sendForm = async () => {
    loading.value = true
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        { 
          name: name.value, 
          email: email.value, 
          phone: contact.value,
          message: message.value,
          user_id: runtimeConfig.public.ANON_KEY
        },
      ])
      .select()
    loading.value = false
    name.value = '', 
    email.value = '', 
    contact.value = '',
    message.value = ''
  }
</script>

<style scoped>
    
</style>