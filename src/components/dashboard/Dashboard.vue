<template>
  <div class="dashboard">
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
