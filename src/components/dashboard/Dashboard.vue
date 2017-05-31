<template>
  <div class="dashboard">
    <md-toolbar>
      <h1 class="md-title">My Title</h1>
    </md-toolbar>
    <farms></farms>
  </div>
</template>

<script>
import farms from '@/components/farms/farms'

export default {
  name: 'dashboard',
  components: {
    farms
  }
}
</script>

<style lang="scss" src="./dashboard.scss"></style>
