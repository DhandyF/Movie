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
    <h6 class="myheader">Movies</h6>
    <b-card-group deck class="ml-5" ref="imgComponent">
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
      indexMovie: null
    }
  },
  mounted() {
    this.loadMovies(1)
    this.lazyLoad()
  },
  methods: {
    loadMovies(page) {
      this.$store.dispatch('loadMovies', page)
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
      // axios
      //   .get('http://www.omdbapi.com/?apikey=faf7e5bb&s=air&type=movie&page=' + page)
      //   .then(response => {
      //     console.log(response);
      //     this.response = response.data
      //     if (response.data.Response) {
      //       response.data.Search.forEach(movie => {
      //         this.movies.push(movie)
      //       });
      //     }
      //     console.log(this.movies);
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   })
    },
    movieDetails(imdbID) {
      this.$router.push({ name: 'Details', params: { imdbID }})
    },
    lazyLoad() {
      window.addEventListener('scroll', () => {
        if (pageYOffset%100 == 0) {
          if(pageYOffset + outerHeight > document.body.scrollHeight - 99) {
            this.page++
            this.loadMovies(this.page)
          }
        }
      })
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', () => {
      if (pageYOffset%100 == 0) {
        if(pageYOffset + outerHeight > document.body.scrollHeight - 99) {
          this.page++
          this.loadMovie(this.page)
        }
      }
    })
  },
}
</script>
