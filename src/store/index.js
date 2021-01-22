import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: "",
    imdbID: ""
  },
  mutations: {
    REQUEST(state) {
      state.status = "loading";
    },
    SUCCESS(state) {
      state.status = "success";
    },
    ERROR(state) {
      state.status = "error";
    },
    STORE_IMDBID(state, payload) {
      state.imdbID = payload.imdbID
    }
  },
  actions: {
    loadMovies({ commit }, page) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");

        axios
        .get('http://www.omdbapi.com/?apikey=faf7e5bb&s=air&type=movie&page=' + page)
          .then(response => {
            if (response.data.Response) {
              commit("SUCCESS");
              resolve(response)
            }
          })
          .catch(error => {
            commit("ERROR");
            reject(error)
          })
      })
    },
    loadDetailsMovie({ commit }, imdbID) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");

        axios
        .get('http://www.omdbapi.com/?apikey=faf7e5bb&i=' + imdbID)
          .then(response => {
            if (response.data.Response) {
              commit("SUCCESS")
              resolve(response)
            }
          })
          .catch(error => {
            commit("ERROR")
            reject(error)
          })
      })
    }
  },
  modules: {
  }
})
