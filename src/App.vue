<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <div id='today'>
      我叫：{{name}}，我将在：{{date}} 发布
    </div>
    <button @click="change">转换格式</button>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
export default {
  data() {
    return {
      name: 'Equicy',
      date: this.$moment().endOf('day').fromNow()
    }
  },

  methods: {
    change() {
      this.name = _.cloneDeep('李四')
      console.log($('today'))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
