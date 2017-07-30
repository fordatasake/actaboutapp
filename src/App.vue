<template>
  <v-app light>

    <!-- v-navigation-drawer -->
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher>
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i">
          <v-list-tile-action>
            <router-link :to="item.route">
              <v-icon light v-html="item.icon"></v-icon>
            </router-link>
          </v-list-tile-action>
          <v-list-tile-content>
            <router-link :to="item.route">
              <v-list-tile-title v-text="item.title"></v-list-tile-title>
            </router-link>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <!-- /v-navigation-drawer -->

    <!-- v-toolbar -->
    <v-toolbar fixed>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-toolbar-title class="toolbar-title">
        <router-link class="logo" to="/">
          <img src="/static/logo.png">
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/">
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </router-link>

    </v-toolbar>
    <!-- /v-toolbar -->

    <!-- main -->
    <main>
      <router-view></router-view>
    </main>
    <!-- /main -->

    <!-- v-footer -->
    <!--<v-footer :fixed="fixed">-->
      <!--<span>&copy; 2017 - For Data Sakes!</span>-->
    <!--</v-footer>-->
    <!-- /v-footer -->

  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [
          {icon: 'home', title: 'Home', route: '/'},
          {icon: 'search', title: 'Search', route: '/search'}
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'ACT About'
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main';

  #app a {
    text-decoration: none;
  }

  #app .toolbar {
    background: #F5F5F5;
  }
  #app .toolbar-title {
    display: flex;
    margin-left: 0;
  }
  #app .logo {
    align-items: center;
    display: inline-block;
  }
  #app .logo img {
    height: 24px;
    width: 93px;
    vertical-align: middle;
  }
</style>
