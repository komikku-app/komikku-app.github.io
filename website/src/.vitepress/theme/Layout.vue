<script setup lang="ts">
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { provide } from 'vue'
import { useRoute } from 'vitepress'
import { watch } from 'vue'

const route = useRoute()

watch(() => route.path, (path, referrer) => {
  window.goatcounter?.count?.({ path, referrer })
})

const { isDark } = useData()

provide('toggle-appearance', () => {
  isDark.value = !isDark.value
})
</script>

<template>
  <DefaultTheme.Layout />
</template>
