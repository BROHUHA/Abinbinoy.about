<template>
  <div class="garden relative -bottom-0.5">
    <div ref="refColibri" v-show="showHummingbird" class="cursor-colibri fixed z-30 top-0 left-0 scale-50 origin-top-left pointer-events-none">
      <Hummingbird />
    </div>
    <div @mousemove="gardenMove($event)" @mouseenter="gardenEnter($event)" @mouseleave="gardenOut($event)" @wheel="gardenOut($event)" @touchstart="gardenEnter($event)" @touchmove="gardenMove($event)" id="plants" class="plants cursor-none absolute z-30 -left-[140px] lg:-left-[220px] bottom-0 w-[550px] sm:w-[calc(100%+550px)] h-[240px] bg-plants bg-[length:auto_200px] bg-[100px_bottom] bg-no-repeat">
      <div class="grass-plants absolute bottom-0 bg-grass-plants w-full h-[120px] bg-[-10px_bottom] bg-no-repeat pointer-events-none"></div>
      <div class="grass-plants absolute bottom-0 bg-grass-plants w-full h-[100px] bg-left-bottom bg-no-repeat pointer-events-none"></div>
    </div>
    <div class="tree hidden lg:block absolute z-20 right-0 bottom-0 w-[45vw] h-screen 4xl:h-[65vh] bg-tree-windy bg-bottom bg-no-repeat">
      <div class="grass-tree absolute right-0 bottom-0 bg-grass-tree w-full h-[130px] bg-bottom bg-no-repeat"></div>
      <div class="grass-tree absolute right-0 bottom-0 bg-grass-tree w-full h-[105px] bg-bottom bg-no-repeat"></div>
    </div>
    <Grass />
    <Flies />
  </div>

  <div class="garden-content bg-black text-white">
    <slot />
  </div>

</template>

<script setup>
  import { onMounted, ref, useTemplateRef } from "vue";
  import Grass from "@/components/Grass.vue";
  import Flies from "@/components/Flies.vue";
  import Hummingbird from "@/components/Hummingbird.vue";
  import { gsap } from "gsap";

  const showHummingbird = ref(false);
  const colibri = useTemplateRef('refColibri');
  const lastCoordinatesAxis = { x: null, y: null };
  const currentCoordinatesAxis = { x: null, y: null };
  let hoveredElement;

  onMounted(() => {
    // Hummingbird hides when the user touches out of the interacting element.
    document.addEventListener('touchstart', (e) => {
      hoveredElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
      hoveredElement.id !== 'plants' ? gardenOut(e) : gardenEnter(e);
    },
      { passive: true }
    );

    let tlHummingbird = gsap.timeline();
    tlHummingbird.to(colibri.value, {
      yPercent: 10,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  })

  const gardenMove = (e) => {
    if (e.type === 'mouseenter' || e.type === 'mousemove') {
      if (showHummingbird.value === false) {
        gardenEnter(e);
      }
    }
    // Get mouse or touch coordinates.
    if (e.type === 'mousemove') {
      currentCoordinatesAxis.x = e.clientX;
      currentCoordinatesAxis.y = e.clientY;
    } else if (e.type === 'touchmove') {
      currentCoordinatesAxis.x = e.touches[0].clientX;
      currentCoordinatesAxis.y = e.touches[0].clientY;
    }

    // Get direction.
    const directionAxisX = currentCoordinatesAxis.x > lastCoordinatesAxis.x ? 'right' : currentCoordinatesAxis.x < lastCoordinatesAxis.x ? 'left' : 'none';
    // const directionAxisY = currentCoordinatesAxis.y > lastCoordinatesAxis.y ? 'down' : currentCoordinatesAxis.y < lastCoordinatesAxis.y ? 'up' : 'none';

    lastCoordinatesAxis.x = currentCoordinatesAxis.x;
    // lastCoordinatesAxis.y = currentCoordinatesAxis.y;

    gsap.fromTo(colibri.value,
      {
        opacity: 1,
        scaleY: .42,
        rotate: directionAxisX === 'left' ? '+=-1.3' : '+=2.3',
        duration: .8,
        ease: "power3"
      },
      {
        opacity: 1,
        scaleY: .5,
        rotate: 0,
        x: currentCoordinatesAxis.x,
        y: currentCoordinatesAxis.y,
        duration: .8,
        ease: "power3"
      }
    );
  }

  const gardenEnter = (e) => {
    gsap.to(colibri.value, {
      opacity: 1,
      filter: "blur(0px)",
      duration: .3,
      x: e.clientX ? e.clientX : e.touches[0].clientX,
      y: e.clientY ? e.clientY : e.touches[0].clientY,
      ease: "power3",
      onStart: () => showHummingbird.value = true
    });
  }

  const gardenOut = (e) => {
    gsap.to(colibri.value, {
      opacity: 0,
      filter: "blur(8px)",
      duration: .3,
      ease: "power3",
      onComplete: () => showHummingbird.value = false
    });
  }
</script>

<style scoped>

  .grass-tree,
  .grass-plants {
    animation: anim-grassx 7s infinite ease-in-out;
    transform-style: preserve-3d;
  }

  @keyframes anim-grassx {

    0% {
      transform: skewX(0);
    }

    20% {
      transform: skewX(-2deg);
    }

    40% {
      transform: skewX(2deg);
    }

    70% {
      transform: skewX(0);
    }

    90% {
      transform: skewX(3deg);
    }
  }
</style>
