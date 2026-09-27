<template>
  <header>
    <div class="container">
      <Preloader>
        <Logo />
        <NavLang />
      </Preloader>
    </div>
  </header>
</template>

<script setup>
  import Preloader from '@/components/Preloader.vue'
  import Logo from '@/components/Logo.vue'
  import NavLang from '@/components/NavLang.vue'
</script>
