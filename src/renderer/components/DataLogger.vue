
<template>
  <table class="table is-fullwidth">
    <thead>
      <tr>
          <th>Date</th>
          <th>Payload</th>
          <th>Rssi</th>
          <th>Snr</th>
      </tr>
    </thead>

    <tbody id="dataList">
      <tr v-for="(item, index) in getLog" :key="index">
        <td>{{time(item.date)}}</td>
        <td>{{item.payload}}</td>
        <td>{{item.rssi}}</td>
        <td>{{item.snr}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import moment from 'moment'

  // const SerialPort = require('serialport')
  // const Readline = SerialPort.parsers.Readline
  // const parser = new Readline()
  // const port = new SerialPort('/dev/tty.usbmodem1411', {
  //   baudRate: 9600
  // })
  // port.pipe(parser)

  export default {
    name: 'data-logger',
    computed: mapGetters(['getLog', 'getConnection']),
    methods: {
      ...mapActions(['newLine']),
      time (createdAt) {
        return moment(createdAt).fromNow(true)
      }
    },
    mounted () {
      this.getConnection.on('data', (data) => {
        // frecuencia: 1 + Hz (MHz * 1000000)
        let [ payload, rssi = '', snr = '' ] = data.split(',')
        let line = { payload, rssi, snr, date: new Date() }
        this.newLine({line})
      })
    }
  }
</script>
