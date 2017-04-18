<template>
  <div id="app">
    <building></building>
    <building></building>
    <building></building>
    <building></building>
    <building></building>
    <building></building>
  </div>
</template>

<script>

import building from './BuildingType1.vue'

export default {
  name: 'app',
  components: {
    building: building,
  },
  mounted() {
  }
}

</script>

<style>
body{
  height:100vh;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  >*{
    float:left;
    display: inline-block;
  }
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
