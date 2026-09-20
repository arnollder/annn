<script setup lang="ts">
withDefaults(defineProps<{
  side?: 'left' | 'right'
}>(), {
  side: 'left'
})
</script>

<template>
  <!--
    Один арт → зеркало. Градиенты снаружи transform, чтобы размытие
    у внешнего и внутреннего края было одинаковым слева и справа.
  -->
  <div
    class="nn-krem-flank pointer-events-none relative h-full min-h-[16rem] overflow-hidden"
    aria-hidden="true"
  >
    <div class="absolute inset-0 bg-gradient-to-b from-volga-800/6 via-transparent to-ember-600/10 dark:from-white/5 dark:to-ember-500/8" />

    <!-- силуэт: только его зеркалим -->
    <div
      class="absolute inset-0"
      :class="side === 'right' ? 'scale-x-[-1]' : ''"
    >
      <svg
        class="nn-krem-art absolute inset-y-2 left-1/2 h-[calc(100%-1rem)] w-[130%] max-w-none -translate-x-1/2 text-volga-950/20 dark:text-white/13"
        viewBox="0 0 240 520"
        preserveAspectRatio="xMidYMax meet"
        fill="currentColor"
      >
        <!-- дальнее прясло (не до краёв — мягче) -->
        <g opacity="0.38">
          <path d="M16 520 V375 H224 V520 Z" />
          <path d="M20 375 V360 H28 V375 H36 V360 H44 V375 H52 V360 H60 V375 H68 V360 H76 V375 H84 V360 H92 V375 H100 V360 H108 V375 H116 V360 H124 V375 H132 V360 H140 V375 H148 V360 H156 V375 H164 V360 H172 V375 H180 V360 H188 V375 H196 V360 H204 V375 H212 V360 H220 V375 Z" />
          <path d="M36 375 A22 22 0 0 1 80 375 V395 H36 Z" />
          <path d="M46 375 L58 335 L70 375 Z" />
        </g>

        <!-- среднее прясло -->
        <path
          opacity="0.5"
          d="M12 520 V392 H228 V520 Z"
        />
        <path
          opacity="0.5"
          d="M18 392 V374 H26 L30 368 L34 374 H42 V392 H50 V374 H58 L62 368 L66 374 H74 V392 H82 V374 H90 L94 368 L98 374 H106 V392 H114 V374 H122 L126 368 L130 374 H138 V392 H146 V374 H154 L158 368 L162 374 H170 V392 H178 V374 H186 L190 368 L194 374 H202 V392 H210 V374 H218 L222 368 L226 374 H228 V392 Z"
        />

        <!-- Часовая -->
        <g>
          <path d="M42 392 A30 30 0 0 1 102 392 V420 H42 Z" />
          <path d="M52 392 V345 H92 V392 Z" />
          <path d="M58 345 V318 H86 V345 Z" />
          <path d="M64 318 L72 292 L80 318 Z" />
          <rect
            x="68"
            y="326"
            width="8"
            height="8"
            rx="1"
            opacity="0.3"
          />
        </g>

        <!-- Дмитриевская ближе к «внутреннему» краю (право в исходнике = к таблице) -->
        <g>
          <path d="M118 392 V248 H198 V392 Z" />
          <path
            fill="var(--nn-paper)"
            opacity="0.5"
            d="M138 392 V318 A20 26 0 0 1 178 318 V392 Z"
          />
          <path d="M112 264 H204 V248 H112 Z" />
          <path
            opacity="0.45"
            d="M118 264 V272 H126 V264 H134 V272 H142 V264 H150 V272 H158 V264 H166 V272 H174 V264 H182 V272 H190 V264 H198 V272 H204 V264 Z"
          />
          <path d="M118 248 V232 H128 V248 H138 V232 H148 V248 H158 V232 H168 V248 H178 V232 H188 V248 H198 V232 H198 V248 Z" />
          <path d="M126 232 L158 162 L190 232 Z" />
          <path
            opacity="0.4"
            d="M136 232 L158 182 L180 232 Z"
          />
          <path d="M158 162 V148 L161 140 L164 148 V162 Z" />
        </g>

        <!-- круглая у внутреннего края -->
        <g>
          <path d="M188 392 A26 26 0 0 1 236 392 V422 H188 Z" />
          <path d="M196 392 V348 L212 302 L228 348 V392 Z" />
          <ellipse
            cx="212"
            cy="348"
            rx="18"
            ry="5"
            opacity="0.4"
          />
        </g>

        <path
          opacity="0.28"
          d="M12 520 V468 Q70 448 120 460 T228 455 V520 Z"
        />
      </svg>
    </div>

    <!-- симметричные мягкие края: внешний + внутренний (не зеркалятся) -->
    <div
      class="nn-krem-fade-outer absolute inset-y-0 w-14 from-[var(--nn-paper)] to-transparent"
      :class="side === 'left'
        ? 'left-0 bg-gradient-to-r'
        : 'right-0 bg-gradient-to-l'"
    />
    <div
      class="nn-krem-fade-inner absolute inset-y-0 w-16 from-[var(--nn-paper)] to-transparent"
      :class="side === 'left'
        ? 'right-0 bg-gradient-to-l'
        : 'left-0 bg-gradient-to-r'"
    />
  </div>
</template>

<style scoped>
.nn-krem-art {
  /* лёгкое одинаковое смягчение углов на обоих флангах */
  filter: blur(0.45px);
}

.nn-krem-fade-outer,
.nn-krem-fade-inner {
  pointer-events: none;
}
</style>
