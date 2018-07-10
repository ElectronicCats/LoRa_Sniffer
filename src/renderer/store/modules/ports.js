
import SerialPort from 'serialport'
const Readline = SerialPort.parsers.Readline


const state = {
  ports: [],
  activePort: '',
  connectionActive: false
}

const mutations = {
  ADD_PORTS (state, ports) {
    state.ports = ports
  },

  SELECT_PORT (state, port) {
    state.activePort = port
  },

  ACTIVE_CONECTION (state) {
    state.connectionActive = true
  }
}

const actions = {
  async laodPorts ({ commit }) {
    let list = await SerialPort.list()
    commit('ADD_PORTS', list.filter(port => port.serialNumber))
  },

  createConnection ({commit}) {
    commit('ACTIVE_CONECTION')
  }
}

const getters = {
  getPorts (state) {
    return state.ports
  },

  getConnection (state) {
    if (!state.connectionActive) return null

    const parser = new Readline()
    const portConnection = new SerialPort(state.activePort, {
      baudRate: 9600
    })

    portConnection.pipe(parser)
    
    return parser
  },

  getConnectionStatus ()  {
    return state.connectionActive
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
