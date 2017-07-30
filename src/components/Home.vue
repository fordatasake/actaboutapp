<template>

  <v-container fluid style="min-height: 0;" grid-list-lg>

    <v-layout row wrap>

      <v-flex xs12>
        <location-search></location-search>
      </v-flex>

      <template v-if="locationLat !== 0 && locationLng !== 0">
        <v-flex xs6>
          <v-card @click="goToCategory('be-healthy', 'Be Healthy')">
            <v-card-media src="/static/card-be-healthy.png" height="150px"></v-card-media>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card @click="goToCategory('be-inspired', 'Be Inspired')">
            <v-card-media src="/static/card-be-inspired.png" height="150px"></v-card-media>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card @click="goToCategory('be-safe', 'Be Safe')">
            <v-card-media src="/static/card-be-safe.png" height="150px"></v-card-media>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card @click="goToCategory('be-smart', 'Be Smart')">
            <v-card-media src="/static/card-be-smart.png" height="150px"></v-card-media>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card @click="goToCategory('be-social', 'Be Social')">
            <v-card-media src="/static/card-be-social.png" height="150px"></v-card-media>
          </v-card>
        </v-flex>

        <v-flex xs6>
          <v-card @click="goToCategory('be-social', 'Be Wild')">
            <v-card-media src="/static/card-be-wild.png" height="150px"></v-card-media>
          </v-card>
        </v-flex>

        <v-flex xs12 @click="findToilet()">
          <v-card-media src="/static/card-public-toilet.png" height="48px"></v-card-media>
        </v-flex>
      </template>

      <v-flex xs12 v-else>
        <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
      </v-flex>

    </v-layout>

  </v-container>


</template>

<script>
  import LocationSearch from './LocationSearch.vue';

  export default {
    name: 'home',
    components: {
      'location-search': LocationSearch
    },
    data () {
      return {
        msg: 'ACT About',
        locationName: '',
        locationLat: 0,
        locationLng: 0
      }
    },
    mounted() {
      const self = this;

      bus.$on('location', function (locationName, lng, lat) {
        // console.log('bus - location', locationName, lng, lat);

        self.locationName = locationName;
        self.locationLat = lat;
        self.locationLng = lng;
      })
    },

    methods: {
      goToCategory(categoryName, categoryType) {
        const self = this;

        // for-emergency?locationName=Canberra&lat=-33.8881924&lng=151.1937073
        // return `/category/${categoryName}?locationName=${self.locationName}&lat=${self.locationLat}&lng=${self.locationLng}`;

        // console.log('goToCategory!', categoryName);
        // console.log('goToCategory', self.locationName);

        self.$router.push({
          name: 'category',
          params: {
            categoryName: categoryName
          },
          query: {
            categoryType: categoryType,
            locationName: self.locationName,
            locationLat: self.locationLat,
            locationLng: self.locationLng
          }
        });
      },
      findToilet() {
         console.log('Need toilet now!');

         //..
         window.location = 'https://www.google.com.au/maps/@-33.8901565,151.1927602,14z';
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>
