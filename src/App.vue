<template>
  <div id="app">
    <div>
      {{getStatistics()}}
    </div>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'Vue'
import VueResource from 'vue-resource'
import store from './store'

Vue.use(VueResource)

const http = Vue.http;

export default {
  name: 'app',
  computed: {
    count () {
	    return store.state.count
    }
  },
  methods: {
    increment () {
      store.commit('increment')
    },
    decrement () {
    	store.commit('decrement')
    },
    getStatistics() {
      let data = {};

      http.get('http://localhost:8080/data')
      .then((response) => {
        return response;
      })
    }
  }
}


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
