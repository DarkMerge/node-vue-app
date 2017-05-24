<template>
  <div id="app">
    <dashboard></dashboard>
    <router-view></router-view>
  </div>
</template>

<script>
import dashboard from '@/components/dashboard/Dashboard'

export default {
  name: 'app',
  components: {
    dashboard
  }
}
</script>

<style lang="scss" src="./assets/main.scss"></style>
