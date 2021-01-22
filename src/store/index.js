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
    loadMovies({ commit }, movie) {
      return new Promise((resolve, reject) => {
        commit("REQUEST");
        let title = "air"
        if (movie.title !== "") {
          title = movie.title
        }

        axios
        .get('http://www.omdbapi.com/?apikey=faf7e5bb&s=' + title + '&type=movie&page=' + movie.page)
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
    searchMovies({ commit }, title) {
      return new Promise((resolve, reject) => {
        commit("REQUEST")

        axios
        .get('http://www.omdbapi.com/?apikey=faf7e5bb&s=' + title)
          .then(response => {
            commit("SUCCESS")
            resolve(response)
          })
          .catch(error => {
            commit("ERROR")
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
              commit("STORE_IMDBID", imdbID)
              commit("SUCCESS")
              localStorage.setItem('imdbID', imdbID)
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
