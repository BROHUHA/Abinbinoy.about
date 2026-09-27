<template>
  <VueLenis root ref="lenisRef" :options="{ autoRaf: false }" />
  <RouterView />
</template>

<script setup>
  import { watchEffect, ref } from 'vue'
  import { useI18n } from "vue-i18n"
  import { useHead } from 'unhead'
  import { VueLenis, useLenis } from 'lenis/vue'
  import { gsap } from "gsap"
  import { ScrollTrigger } from "gsap/ScrollTrigger"

  gsap.registerPlugin(ScrollTrigger);

  const { t } = useI18n()
  const lenisRef = ref()

  watchEffect(() => {
    // Note: watchEffect is needed because `t()` doesn't trigger reactivity in useHead()
    // A watcher doesn't seem to be the best practice for unhead library,
    // but I've not found any other effective method to make it reactive for translations
    // @see https://v1.unhead.unjs.io/setup/vue/best-practices
    const pageTitle = `Abin Binoy — ${t('meta.title')} | About Abin Binoy`
    const pageDescription = t('meta.description')
    const siteUrl = 'https://abinbinoy-about.vercel.app'
    const ogImage = `${siteUrl}/images/abin-binoy-og-cover.png`

    useHead({
      htmlAttrs: {
        lang: t('languages.code'),
      },
      title: pageTitle,
      meta: [
        // Primary Meta Tags
        { name: 'title', content: pageTitle },
        { name: 'description', content: pageDescription },
        { name: 'keywords', content: 'abin, abin binoy, abin binoy about, abin about, about abin binoy, abin binoy portfolio, abin binoy developer, abin binoy web developer, abin binoy full stack developer, abin binoy kerala, abin binoy india, abin binoy react, abin binoy vue, web developer india, full stack developer kerala, BROHUHA, abin binoy BCA, abin binoy projects' },
        { name: 'author', content: 'Abin Binoy' },
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },

        // Google Site Verification
        { name: 'google-site-verification', content: 'googlec6bcbea9d1c6f3b9' },

        // Open Graph / Facebook
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: `${siteUrl}/` },
        { property: 'og:site_name', content: 'Abin Binoy — About' },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:image', content: ogImage },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Abin Binoy — Full-Stack Web Developer portfolio website preview' },
        { property: 'og:locale', content: 'en_US' },

        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: `${siteUrl}/` },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: pageDescription },
        { name: 'twitter:image', content: ogImage },
        { name: 'twitter:image:alt', content: 'Abin Binoy — Full-Stack Web Developer portfolio website preview' },

        // Geo Tags
        { name: 'geo.region', content: 'IN-KL' },
        { name: 'geo.placename', content: 'Kerala' },
      ],
      link: [
        { rel: 'canonical', href: `${siteUrl}/` },
      ],
    });
  });

  // GSAP/Lenis integration.
  // @see https://github.com/darkroomengineering/lenis/blob/main/packages/vue/README.md
  watchEffect((onInvalidate) => {
    if (!lenisRef.value?.lenis) return

    //  if using GSAP ScrollTrigger, update ScrollTrigger on scroll
    lenisRef.value.lenis.on('scroll', ScrollTrigger.update)

    // add the Lenis requestAnimationFrame (raf) method to GSAP's ticker
    // this ensures Lenis's smooth scroll animation updates on each GSAP tick
    function update(time) {
      lenisRef.value.lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)

    // disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0)

    // clean up GSAP's ticker from the previous execution of watchEffect, or when the effect is stopped
    onInvalidate(() => {
      gsap.ticker.remove(update)
    })
  })

</script>

<style>

  /* Page loaded */
  html[data-page-loaded="true"] {
    animation: anim-init-scroll 500ms 1900ms forwards;
  }

  @keyframes anim-init-scroll {
    0% {
      overflow: hidden;
    }

    100% {
      overflow: auto;
    }
  }

  html[data-page-loaded="true"] main {
    opacity: 0;
    animation: anim-init-main 500ms 1900ms forwards;
  }

  @keyframes anim-init-main {
    0% {
      opacity: 0;
      margin-top: -4vh;
      background-size: auto 90%;
    }

    100% {
      opacity: 1;
      margin-top: 0;
      background-size: auto 95%;
    }
  }
</style>

