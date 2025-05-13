<template>
  <div>
    <!-- Navbar -->
    <NavBar />

    <!-- Jumbotron -->
    <b-jumbotron class="myjumbotron" bg-variant="dark" text-variant="info">
      <template #header>
        2021
      </template>
      <template #lead>
        Stay home and watch movies on My-Movies
      </template>
    </b-jumbotron>
    
    <!-- List movies -->
    <div class="myheader">
      <h6 class="myheader__title">Movies</h6>
      <b-form-input v-model="title" size="sm" class="search" placeholder="Search"></b-form-input>
      <b-button size="sm" class="search__btn" type="submit" variant="light" @click="searchMovie">
        <b-icon icon="search"></b-icon>
      </b-button>
    </div>
    <p v-show="title != '' && isSearch" class="mytitle" @click="clearSearch">{{ title }}
      <b-icon class="ml-1" icon="x" variant="dark"></b-icon>
    </p>
    <b-card-group class="mx-4" ref="imgComponent">
      <b-card
        v-b-modal.movie-modal
        v-for="(movie,index) in movies"
        :key="movie.imdbID"
        :img-src="movie.Poster !== 'N/A' ? movie.Poster : require('../assets/images/no-image.jpg')"
        img-height="260"
        img-alt="Image"
        img-top
        class="mycard"
        style="max-width: 183px; min-width: 183px;"
        @click="indexMovie = index"
      >
        <b-card-text>
          <p class="mycard__title">{{ movie.Title }}</p>
          <p class="mycard__subtitle">{{ movie.Year }}</p>
        </b-card-text>
      </b-card>
    </b-card-group>
    
    <b-modal v-if="indexMovie != null" id="movie-modal" centered hide-header>
      <img class="modal__image" :src="movies[indexMovie].Poster">
      <template #modal-footer class="modal__footer">
        <div class="w-100">
          <b-button
            size="sm"
            class="float-right modal__button"
            @click="movieDetails(movies[indexMovie].imdbID)"
          >
            Details >>
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar.vue'
// import axios from 'axios'

export default {
  name: 'Home',
  components: {
    NavBar
  },
  data() {
    return {
      response: {},
      movies: [],
      noImage: '~/assets/images/no-image.jpg',
      page: 1,
      indexMovie: null,
      title: "",
      isSearch: false
    }
  },
  mounted() {
    this.loadMovies(1)
    this.lazyLoad()
    this.clearLocalStorage()
  },
  methods: {
    loadMovies(page) {
      let movie = {
        title: this.title,
        page: page
      }
      this.$store.dispatch('loadMovies', movie)
        .then(response => {
          this.response = response.data
          if (this.response.Response) {
            response.data.Search.forEach(movie => {
              this.movies.push(movie)
            });
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    searchMovie() {
      this.$store.dispatch('searchMovies', this.title)
        .then(response => {
          this.response = response.data
          if (this.response.Response) {
            this.isSearch = true
            this.movies = this.response.Search
          }
        })
        .catch(error => {
          console.log(error);
        })
    },
    movieDetails(imdbID) {
      this.$router.push({ name: 'Details', params: { imdbID }})
    },
    clearSearch() {
      this.title = ""
      this.movies = []
      this.isSearch = false
      this.loadMovies(1)
    },
    lazyLoad() {
      window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.body.scrollHeight;

        if (scrollY % 100 < 30) {
          if (scrollY + windowHeight > documentHeight - 99) {
            this.page++;
            this.loadMovies(this.page);
          }
        }
      })
    },
    clearLocalStorage() {
      if (localStorage.getItem('imdbID')) {
        localStorage.removeItem('imdbID')
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll')
  },
}
</script>

<style scoped>
body {
  min-width: 578px;
}
</style>
