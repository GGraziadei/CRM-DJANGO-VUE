import { createStore } from 'vuex'

export default createStore({
  state: {
    isLoading: false,
    isAuthenticated: false,
    token: '',
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.localStorage = localStorage.getItem('token')
        state.isAuthenticated = true
      } else{
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setIsLoading(state, status) {
      state.isLoading = status
    },
    setToken(state, token) {
      state.token = token
    },
    removeToken (state, token) {
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
  },
  modules: {
  }
})
