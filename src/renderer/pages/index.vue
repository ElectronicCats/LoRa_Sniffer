<template>
  <section class="h-screen flex flex-col">
    <div class="header flex">
      <h1 class="flex-1 text-2xl">Lora Sniffer</h1>
      <port-list @change="selectPort" />
    </div>

    <pre
      class="flex-1 border-0 border-t border-b border-gray-500 overflow-auto"
      v-highlightjs="consoleHistory"><code class="shell"></code></pre>

    <form @submit.prevent="handlerForm" class="flex bg-gray-400">
      <input type="text" v-model="command" class="flex-1 p-2" :disabled="!currentPort" />
      <input type="submit" value="Send" class="py-2 px-4 bg-blue-600 text-white font-bold" />
    </form>
  </section>
</template>

<script>
import PortList from '../components/PortsList'
import Serialport from 'serialport'
import Readline from '@serialport/parser-readline'

export default {
  components: {
    PortList
  },
  data () {
    return {
      port: '',
      currentPort: undefined,
      consoleHistory: '$ """ Choose one port """',
      command: '',
      parser: undefined
    }
  },
  mounted() {
    // const port = new serialport(activePorts[0].path, { baudRate: 115200 })
    // const parser = new Readline()
    // port.pipe(parser)
    // parser.on('data', line => console.log(`> ${line}`))
  },
  destroyed() {
    this.currentPort.close()
  },
  methods: {
    addLine (line) {
      this.consoleHistory = this.consoleHistory + `\n$ ${line.replace(/(\r\n|\n|\r)/gm, "")}`
    },
    createConection () {
      if (this.currentPort !== undefined) this.currentPort.close()
      this.currentPort = new Serialport(this.port, { baudRate: 115200 }, err => {
        if (err) {
          console.log(err)
          return this.addLine(`fail conection: port '${this.port}'`)
        }
        this.parser = new Readline()
        this.currentPort.pipe(this.parser)
        this.parser.on('data', this.addLine)
      }) 
    },
    selectPort (port) {
      this.port = port
      this.addLine(`port '${port}' selected`)
      this.createConection()
      this.addLine(`port '${port}' active`)
    },
    handlerForm () {
      this.addLine(this.command)
      
      if (this.command.includes('reconect')) {
        this.createConection()
      } else if (this.command.includes('clear')) {
        this.consoleHistory = ''
        this.addLine('clear')
      } else {
        this.currentPort.write(this.command + '\n', function(err) {
          if (err) {
            console.error(err)
            this.addLine(`reconecting...`)
            return
          }
          console.log('message written')
        })
      }
      
      this.command = ''
    }
  }
}
</script>

<style>

</style>
