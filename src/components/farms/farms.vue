<template>
  <div class="farms">
    <div class="farm flex">
      <div class="w-220px farm-col farm-left-col">
        <div class="farm-header flex align-center space-around">
          <div class="farm-header-title">
            {{parsedLocalStats.farmName}}
          </div>
          <div class="farm-header-title">
            {{parsedLocalStats.gpuCount}} GPU
          </div>
        </div>
      </div>
    </div>
    <div>
      <pre>{{parsedLocalStats.gpuStats}}</pre>
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
    api.getLocalStats()
  },
  computed: {
    parsedStats () {
	    return store.state.stats
    },
    parsedLocalStats () {
	    store.state.localStats.gpuCount = 6
	    return store.state.localStats
    }
  },
  methods: {
    reloadFarms () {
      api.getStats()
      api.getLocalStats()
    }
  }
}
</script>

<style lang="scss" src="./farms.scss"></style>
