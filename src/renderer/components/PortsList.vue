<template>
  <div class="select level-item">
    <select
      id="options"
      v-model="selected"
      @change="handler"
      class="bg-white p-2 mr-2"
      >
      <option value="" disabled selected>choose a serial port</option>
      <option 
        v-for="port in ports" 
        :value="port.path"
        :key="port.serialNumber">
        {{ port.manufacturer }} - {{ port.path }}
        </option>
    </select>
  </div>
</template>

<script>
// manufacturer: "Electronic Cats"
// serialNumber: "81B76958504E5453372E3120FF162E23"
// pnpId: "usb-Electronic_Cats_CatWAN_USB_Stick_81B76958504E5453372E3120FF162E23-if00"
// locationId: undefined
// vendorId: "1209"
// productId: "bab2"
// path: "/dev/ttyACM0"

import Serialport from 'serialport'

export default {
  data () {
    return {
      selected: '',
      ports: []
    }
  },
  mounted () {
    Serialport.list().then(ports => {
      this.ports = ports.filter(p => p.vendorId)
    })
  },
  methods: {
    handler ({target: { value } }) {
      this.$emit('change', value)
    }
  }
}
</script>
