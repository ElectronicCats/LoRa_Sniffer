<template>
  <section class="section">
    <div class="container">
        <div class="level">
          <div class="level-left">
            <h1 class="title">LoRa sniffer</h1>
          </div>
          <div class="level-right">
            <!-- <icon-button icon="call_made" :is-danger="true">
              disconnect
            </icon-button>
            <icon-button icon="call_received" :is-primary="true">
              connect
            </icon-button> -->
            <ports-list></ports-list>
          </div>
        </div>

        <data-logger v-if="getConnectionStatus"></data-logger>
    </div>
  </section>
</template>

<script>
  import { mapGetters } from 'vuex'
  
  import PortsList from '@/components/PortsList.vue'
  import IconButton from '@/components/IconButton.vue'
  import DataLogger from '@/components/DataLogger.vue'

  export default {
    name: 'home-page',
    components: { PortsList, IconButton, DataLogger },
    computed: mapGetters(['getConnectionStatus']),
  }
</script>
