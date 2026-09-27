<template>
  <section ref="aboutRef" class="about container">
    <div class="prose-lg md:prose-xl prose-h1:mb-0 prose-li:m-0 prose-li:p-0 prose-ul:pl-0 leading-relaxed mt-12 mb-[26rem] sm:mb-[22rem] lg:mb-[23rem] xl:mb-[21rem] 3xl:mb-[21rem] text-balance">
      <h1 ref="titleRef" class="text-5xl sm:text-6xl md:text-7xl 2xl:text-8xl font-alternateGothic2 uppercase text-pretty" v-html="$t('yo.title')"></h1>
      <div class="lg:w-[60%]">
        <p>{{ $t('yo.text1') }}</p>
        <p>{{ $t('yo.text2') }}</p>
        <p>{{ $t('yo.text3') }}</p>
        <i18n-t keypath="yo.text4" tag="p">
          <a href="https://github.com/BROHUHA" target="_blank" :aria-label="$t('aria.awwwardsLink')">Github</a>
          <a href="https://brohuha.github.io/BROHUHA/" target="_blank" :aria-label="$t('aria.skizophonicLink')">DOPAMINE</a>
        </i18n-t>
        <ul>
          <li>{{ $t('yo.timeline.13.text') }} <a href="https://www.samsung.com/levant/support/model/SM-M315FZBVMID/" target="_blank" :aria-label="$t('aria.timelineLink')">{{ $t('yo.timeline.13.linkText') }}</a>.</li>
          <li>{{ $t('yo.timeline.16.text') }} <a href="https://pubg.com/en/" target="_blank" :aria-label="$t('aria.timelineLink')">{{ $t('yo.timeline.16.linkText') }}</a>.</li>
          <li>{{ $t('yo.timeline.18.text') }} <a href="https://www.hp.com/in-en/shop/victus-gaming-laptop-15-fa2700tx-b7gp4pa.html" target="_blank" :aria-label="$t('aria.timelineLink')">{{ $t('yo.timeline.18.linkText') }}</a>.</li>
          <li>{{ $t('yo.timeline.21.text') }} <a href="https://brohuha.github.io/abinbinoy.comm/" target="_blank" :aria-label="$t('aria.timelineLink')">{{ $t('yo.timeline.21.linkText') }}</a>.</li>
          <li>{{ $t('yo.timeline.23.text') }} <a href="https://brohuha.github.io/BROHUHA/" target="_blank" :aria-label="$t('aria.timelineLink')">{{ $t('yo.timeline.21.linkText') }}</a>.</li>
          <li>{{ $t('yo.timeline.27.text') }} <a href="https://brohuha.github.io/abinbinoy.comm/" target="_blank" :aria-label="$t('aria.timelineLink')">{{ $t('yo.timeline.27.linkText') }}</a>.</li>
          <li>{{ $t('yo.timeline.33.text') }} <a href="#" target="_blank" :aria-label="$t('aria.timelineLink')">{{ $t('yo.timeline.33.linkText') }}</a> {{ $t('yo.timeline.33.text2') }}.</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="prose-lg md:prose-xl prose-a:text-gray-400 prose-a:after:bg-gray-400 prose-li:m-0 prose-li:p-0 prose-h2:text-5xl md:prose-h2:text-7xl prose-h2:my-8 prose-h2:font-alternateGothic2 prose-h2:uppercase prose-h2:font-normal prose-h2:tracking-wider prose-ul:pl-0">
    <Garden>
      <Projects />
      <div class="container relative py-8 md:pb-52">
        <div class="md:w-[70%] xl:w-[55%] 2xl:w-[40%] 4xl:w-1/2">
          <Skills />
        </div>
      </div>
    </Garden>
  </section>
</template>

<script setup>
  import { onMounted, useTemplateRef } from "vue";
  import Garden from "@/components/Garden.vue";
  import Projects from '@/components/Projects.vue'
  import Skills from '@/components/Skills.vue'

  import { gsap } from "gsap"
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  import { SplitText } from "gsap/SplitText";

  gsap.registerPlugin(ScrollTrigger, SplitText);

  const title = useTemplateRef('titleRef')
  const about = useTemplateRef('aboutRef')

  onMounted(async () => {
    await document.fonts.ready

    const mm = gsap.matchMedia();

    // Only desktop.
    mm.add("(min-width: 768px)", () => {
      const mainTitle = SplitText.create(title.value, { type: 'words' })
      gsap.from(mainTitle.words, {
        x: 60,
        opacity: 0,
        filter: "blur(6px)",
        stagger: 0.05,
        duration: .5,
        ease: 'power4.out',
        delay: 2.6
      });
    });

    gsap.to(about.value, {
      yPercent: 40,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  });
</script>
