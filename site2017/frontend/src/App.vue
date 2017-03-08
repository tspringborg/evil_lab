<template>
  <div id="app">
    <world/>
    <building/>
  </div>

</template>

<script>

import building from './Building.vue'
import world from './World.vue'

import controls from './Controls.js'

export default {
  name: 'app',
  components: {
    building: building,
    world:world
  },
  mounted() {
    controls.setup()
  }

}

</script>

<style>
body{
  overflow: hidden;
  height:100vh;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app >* {
  display: inline-block;
  float: left;
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
