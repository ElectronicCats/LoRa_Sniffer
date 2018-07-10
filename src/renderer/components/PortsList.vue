<template>
  <div class="select level-item">
    <select id="options" v-model="activePort">
      <option value="" disabled selected>choose a serial port</option>
      <option 
        v-for="item in getPorts" 
        v-bind:value="item.comName"
        :key="item.serialNumber">
        {{ item.comName }}
      </option>
    </select>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
import { log } from 'util';

  export default {
    name: 'ports-list',
    data () {
      return {
        ports: []
      }
    },
    computed: {
      ...mapGetters(['getPorts']),
      activePort: {
        get () {
          return this.$store.state.ports.activePort
        },
        set (value) {
          this.$store.commit('SELECT_PORT', value)
          this.$store.dispatch('createConnection')
        }
      }
    },
    methods: mapActions(['laodPorts']),
    mounted () {
      this.laodPorts()
    }
  }
</script>
