<template>
  <div>
    <NavBar />
    <div class="movie">
      <div class="movie__poster">
        <img class="movie__image" :src="movie.Poster" :alt="movie.Title">
      </div>
      <div class="movie__details">
        <h1 class="movie__title">{{ movie.Title }} <span class="movie__title--thin">({{ movie.Year }})</span> </h1>
        <p>Genre: {{ movie.Genre }} <span class="movie__runtime"> {{ movie.Runtime }} </span> </p>
        <p>Language: {{ movie.Language }}</p>
        <div class="movie__rating">
          <div 
            class="movie__rating__value"
            :class=" Number(movie.imdbRating) >= 7 ? 'movie__rating__value--green' : 'movie__rating__value--yellow'" 
          >
            {{ movie.imdbRating }}
          </div>
          <p class="mylabel">imdb<br>Rating</p>
        </div>
        <p class="mylabel mylabel--bold">Overview</p>
        <p>{{ movie.Plot }}</p>
        <div class="movie__people">
          <div class="movie__role">
            <p class="mylabel mylabel--thin">Director</p>
            {{ movie.Director }}
          </div>
          <div class="movie__role">
            <p class="mylabel mylabel--thin">Writer</p>
            {{ movie.Writer }}
          </div>
          <div class="movie__role">
            <p class="mylabel mylabel--thin">Actors</p>
            {{ movie.Actors }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/Navbar.vue'

export default {
  name: 'Details',
  components: {
    NavBar
  },
  props: {
    imdbID: {
      type: String
    }
  },
  data() {
    return {
      movie: {}
    }
  },
  mounted() {
    this.loadDetails(this.imdbID)
  },
  methods: {
    loadDetails(imdbID) {
      this.$store.dispatch('loadDetailsMovie', imdbID)
        .then(response => {
          console.log(response);
          this.movie = response.data
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
}
</script>