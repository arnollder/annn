<script setup lang="ts">
</script>

<template>
  <div
    class="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] overflow-hidden"
    aria-hidden="true"
  >
    <div class="nn-river-band absolute inset-0" />
    <svg
      class="absolute bottom-0 left-1/2 h-[92%] w-[150%] max-w-none -translate-x-1/2 text-volga-950/80 dark:text-black/70"
      viewBox="0 0 1400 320"
      preserveAspectRatio="xMidYMax meet"
      fill="currentColor"
    >
      <!-- прясло + зубцы -->
      <path d="M0 320 V210 H1400 V320 Z" />
      <path d="M0 210 V192 H18 V210 H36 V192 H54 V210 H72 V192 H90 V210 H108 V192 H126 V210 H144 V192 H162 V210 H180 V192 H198 V210 H216 V192 H234 V210 H252 V192 H270 V210 H288 V192 H306 V210 H324 V192 H342 V210 H360 V192 H378 V210 H396 V192 H414 V210 H432 V192 H450 V210 H468 V192 H486 V210 H504 V192 H522 V210 H540 V192 H558 V210 H576 V192 H594 V210 H612 V192 H630 V210 H648 V192 H666 V210 H684 V192 H702 V210 H720 V192 H738 V210 H756 V192 H774 V210 H792 V192 H810 V210 H828 V192 H846 V210 H864 V192 H882 V210 H900 V192 H918 V210 H936 V192 H954 V210 H972 V192 H990 V210 H1008 V192 H1026 V210 H1044 V192 H1062 V210 H1080 V192 H1098 V210 H1116 V192 H1134 V210 H1152 V192 H1170 V210 H1188 V192 H1206 V210 H1224 V192 H1242 V210 H1260 V192 H1278 V210 H1296 V192 H1314 V210 H1332 V192 H1350 V210 H1368 V192 H1386 V210 H1400 V210 Z" />
      <!-- круглые шатровые -->
      <path d="M80 210 A45 45 0 0 1 170 210 V240 H80 Z" />
      <path d="M95 210 L125 145 L155 210 Z" />
      <path d="M1180 210 A42 42 0 0 1 1264 210 V238 H1180 Z" />
      <path d="M1194 210 L1222 150 L1250 210 Z" />
      <!-- Дмитриевская (квадрат + шатёр) -->
      <path d="M520 210 V95 H680 V210 Z" />
      <path
        opacity="0.35"
        d="M545 210 V145 A30 35 0 0 1 655 145 V210 Z"
      />
      <path d="M510 110 H690 V95 H510 Z" />
      <path d="M530 95 L600 20 L670 95 Z" />
      <path d="M600 20 V5" stroke="currentColor" stroke-width="4" fill="none" />
      <!-- Часовая ступенчатая -->
      <path d="M900 210 A40 40 0 0 1 980 210 V235 H900 Z" />
      <path d="M912 210 V165 H968 V210 Z" />
      <path d="M922 165 V140 H958 V165 Z" />
      <path d="M930 140 L940 115 L950 140 Z" />
      <!-- волга -->
      <path
        opacity="0.35"
        d="M0 320 V245 Q350 220 700 238 T1400 230 V320 Z"
      />
    </svg>
  </div>
</template>
