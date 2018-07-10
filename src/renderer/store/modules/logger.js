
const state = {
  log: [{
    date: new Date(),
    payload: 'hola mundo',
    rssi: 2.3,
    snr: -1.4
  }],
}

const mutations = {
  ADD_LINE (state, line) {
    if (state.log.length >= 5) {
      state.log.pop()
    }
    state.log.unshift(line)
  }
}

const actions = {
  newLine ({ commit }, {line}) {
    commit('ADD_LINE', line)
  }
}

const getters = {
  getLog: (state) => {
    return state.log
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
