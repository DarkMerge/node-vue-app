<template>
  <div class="farms">
    <div class="farm center">
      <div class="farm-header flex align-center first">
        <div class="w-220px farm-col flex align-center space-around">
          <div class="farm-header-title">
            {{parsedStats.farmName}}
          </div>
          <div class="farm-header-title">
            {{parsedStats.gpuCount}} GPU
          </div>
        </div>
      </div>
      <div class="farm-header flex align-center">
        <div class="w-220px flex farm-col center space-around">
          GPU NAME
        </div>
        <div class="w-420px flex align-center space-around">
          <div class="farm-header-title">
            Temp
          </div>
          <div class="farm-header-title">
            Fan
          </div>
          <div class="farm-header-title">
            Load
          </div>
          <div class="farm-header-title">
            Core
          </div>
          <div class="farm-header-title">
            Memory
          </div>
        </div>
        </div>
        <div class="farm-col">
        <div class="gpu-card flex align-center">
          <div class="w-220px gpu-card">
            {{parsedStats.test ? parsedStats.test.Text : '-'}}
          </div>
          <div class="w-420px flex align-center space-around">
            <div class="farm-header-title">
              {{parsedStats.test ? parsedStats.test.tempData.Value : '-'}}
            </div>
            <div class="farm-header-title">
              {{parsedStats.test ? parsedStats.test.fansData.Value : '-'}}
            </div>
            <div class="farm-header-title">
              {{parsedStats.test ? parsedStats.test.loadData.Value : '-'}}
            </div>
            <div class="farm-header-title">
              {{parsedStats.test ? parsedStats.test.coreData.Value : '-'}}
            </div>
            <div class="farm-header-title">
              {{parsedStats.test ? parsedStats.test.memData.Value : '-'}}
            </div>

                      </div>
        </div>
      </div>
    </div>
    <button type="button" v-on:click="reloadFarms">Reload</button>
  </div>
</template>

<script>
import _ from 'lodash'
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
        store.state.stats.test.Children.forEach(elem => {
          if (elem.Text === 'Temperatures') {
            elem.Children.forEach(child => {
              store.state.stats.test.tempData = {
                Value: child.Value
              }
            });
          }
          if (elem.Text === 'Fans') {
            elem.Children.forEach(child => {
              store.state.stats.test.fansData = {
                Value: child.Value
              }
            });
          }
          if (elem.Text === 'Load') {
            elem.Children.forEach(child => {
              store.state.stats.test.loadData = {
                Value: child.Value
              }
            });
          }
              if (elem.Text === 'Clocks') {
            elem.Children.forEach(child => {
              console.log(child);
              if (child.Text === 'GPU Core') {
              store.state.stats.test.coreData = {
                Value: child.Value
              } 
              }
              if (child.Text === 'GPU Memory') {
              store.state.stats.test.memData = {
                Value: child.Value
              } 
              }
            });
            
          }
        });
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
