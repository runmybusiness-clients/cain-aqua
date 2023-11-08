<template>
  <div class="main-container min-h-screen h-full">
    <MainNavbar />

    <main class="relative bg-white">
      <slot />

      <Transition name="slide-fade">
        <section class="fixed bottom-4 right-4 rounded-2xl overflow-hidden shadow-lg bg-white z-10 w-[28vw]" v-if="openChat">
          <header class="flex justify-between p-3 bg-green-500">
            <div class="flex items-center justify-center gap-2 text-white">
              <Icon name="ic:round-whatsapp" class="w-8 h-8" />
              <span>WhatsApp</span>
            </div>
            <button class="bg-green-600/25 text-white flex items-center justify-center rounded-full h-9 w-9" @click="openChat = !openChat">
              <Icon name="iconamoon:sign-times" class="w-5 h-5" />
            </button>
          </header>
          <div class="p-4">
            <div class="text-zinc-900 shadow p-4 rounded-xl border">
              Hi, How can I help you? <br/>
              Please contact on +91-9915553482 for any product enquires.
              <br/><br/>
              Thanks
            </div>
          </div>
          <footer class="px-4 flex justify-end pb-4">
            <button class="flex items-center gap-2 bg-green-500 text-white rounded-xl px-4 py-2.5 group">
              <span>Open chat</span>
              <Icon name="carbon:send-alt-filled" class="h-6 w-6 group-hover:scale-125 transition duration-700 ease-in-out" />
            </button>
          </footer>
        </section>
        <button v-else class="fixed bottom-4 right-4 z-0 bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center" @click="openChat = !openChat">
          <Icon name="ic:round-whatsapp" class="w-9 h-9" />
        </button>
      </Transition>
    </main>

    <mainFooter />
  </div>
</template>

<script setup>
  const openChat = ref(false)
</script>

<style setup>
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.7, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
</style>