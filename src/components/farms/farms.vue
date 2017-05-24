<template>
  <div class="farms">
    <div class="farm">
      <div class="farm-header flex align-center space-between">
        <div class="w-220px farm-col flex align-center space-around">
          <div class="farm-header-title">
            {{parsedStats.farmName}}
          </div>
          <div class="farm-header-title">
            {{parsedStats.gpuCount}} GPU
          </div>
        </div>
        <div class="w-220px farm-col flex align-center space-around">
          <div class="farm-header-title">
            {{parsedStats.farmName}}
          </div>
          <div class="farm-header-title">
            {{parsedStats.gpuCount}} GPU
          </div>
        </div>
      </div>
      <div class="farm-col">
        <div class="w-220px farm-col center">
          GPU NAME
        </div>
        <div class="gpu-card flex align-center space-between">
          <div class="w-220px gpu-card">
            {{parsedStats.test ? parsedStats.test.Text : '-'}}
          </div>
          <div class="w-220px flex ">
            {{parsedStats.test ? parsedStats.test.Text : '-'}}
          </div>
        </div>
      </div>
      <div class="">
        <pre>{{parsedStats.test ? parsedStats.test.Children : '-'}}</pre>
      </div>
    </div>
    <button type="button" v-on:click="reloadFarms">Reload</button>
  </div>
</template>

<script>
import store from '../../store'
import api from '../../api'

export default {
  name: 'farms',
  mounted: () => {
    api.getStats()
  },
  computed: {
    parsedStats () {
      if (store.state.stats.gpuStats && store.state.stats.gpuStats.Text) {
        store.state.stats.test = store.state.stats.gpuStats
      }
	    return store.state.stats
    }
  },
  methods: {
    reloadFarms () {
      api.getStats()
    }
  }
}
</script>

<style lang="scss" src="./farms.scss"></style>
