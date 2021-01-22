<template>
  <div>
    <b-navbar class="mynavbar" toggleable="lg" type="dark">
      <b-navbar-brand href="#" class="mynavbar__title" @click="goToHome()">My-Movie</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Movies</b-nav-item>
          <b-nav-item href="#">TV Show</b-nav-item>
          <b-nav-item href="#">People</b-nav-item>
          <b-nav-item href="#">More</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-form class="mr-3">
            <b-form-input size="sm" class="mynavbar__search" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0 mynavbar__searchbtn" type="submit" variant="light">
              <b-icon icon="search"></b-icon>
            </b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/')
    },
  },
}
</script>
