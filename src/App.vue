<template>
  <div id="app">
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="#">
        <img
          src="https://placekitten.com/g/30/30"
          class="d-inline-block align-top"
          alt="Kitten"
        />
        Shop dashboard
      </b-navbar-brand>
    </b-navbar>
    <b-container>
      <b-row>
        <b-col md="2">
          <b-nav vertical id="nav" class="text-start">
            <b-nav-item to="/">Home</b-nav-item>
            <b-nav-item to="/products">Products</b-nav-item>
            <b-nav-item to="/categories">Categories</b-nav-item>
            <b-nav-item to="/about">About</b-nav-item>
          </b-nav>
        </b-col>
        <b-col md="10">
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.navbar-light {
  background: #41b883;
  padding: 12px 30px;
  margin-bottom: 24px;
  .navbar-brand {
    color: #fff;
    font-weight: 700;
    img {
      margin-right: 16px;
    }
  }
}

h1 {
  text-align: left;
}
</style>
