<template>

  <v-layout row>
    <v-flex xs12>

      <v-card>
        <v-card-title class="title--secondary" secondary-title>
          <div>{{ categoryType }} in</div><br />
        </v-card-title>
        <v-card-title class="title--primary teal--text" primary-title>
          <div class="headline">{{ locationName }}</div>
        </v-card-title>
      </v-card>

      <v-card v-if="results.length > 0">
        <v-list>
          <template v-for="result in results">
            <v-list-tile avatar v-if="result.obj.title || result.obj.facility">

              <v-list-tile-content v-if="result.obj.title">
                <v-list-tile-title v-text="result.obj.title"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-content v-else>
                <v-list-tile-title v-text="result.obj.facility"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-avatar>
                <map-button :lat="result.obj.latitude" :lng="result.obj.longitude"></map-button>
              </v-list-tile-avatar>

            </v-list-tile>

            <v-divider></v-divider>
          </template>
        </v-list>
      </v-card>
      <v-card v-else>
        <v-progress-linear v-bind:indeterminate="true"></v-progress-linear>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
  import MapButton from './MapButton.vue';

  export default {
    name: 'search-results',
    components: {
      'map-button': MapButton
    },
    data () {
      return {
        items: [
          { divider: true },
          {
            avatar: '/static/card-arts.png',
            title: 'Brunch this weekend?',
            subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
          },
          { divider: true, inset: true },
          {
            avatar: '/static/card-arts.png',
            title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
            subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> — Wish I could come, but I'm out of town this weekend."
          }
        ],
        results: [],

        categoryType: '',
        locationName: '',
        locationLat: 0,
        locationLng: 0
      }
    },
    beforeRouteEnter(to, from, next) {
      // console.log('beforeRouteEnter', to.query.categoryType);

      if(to.query.categoryType) {
        next();
      } else {
        next({ path: '/' });
      }
    },
    created() {
      const self = this;
      // console.log('created', self.$route.query);

      //..
      self.categoryType = self.$route.query.categoryType;
      self.locationName = self.$route.query.locationName;
      self.locationLat = self.$route.query.locationLat;
      self.locationLng = self.$route.query.locationLng;

      //..
      self.fetchData(self.$route.query.categoryType, self.$route.query.locationLat, self.$route.query.locationLng);
    },
    watch: {
      // call again the method if the route changes
      '$route': 'fetchData'
    },
    methods: {
      fetchData(categoryType, locationLat, locationLng,) {
        const self = this;

        //..
        // console.log('fetchData - self.locationName', categoryType);

        //..
        self.$http.post(`https://ff885bbf.ngrok.io/search`, {
//          "category": categoryType,
//          "lng": locationLat,
//          "lat": locationLng

          "lng": "149.13512299999999",
          "lat": "-35.31656",
          "category" : "Be Inspired"
        })
          .then(({ data }) => {
            // console.log('fetchData - res', data);

            self.results = data;
          })
          .catch((e) => {
            console.error('fetchData', e);
            self.$router.replace({ path: 'home' });
          })
      },
      setGmapsUrl(result) {
        return `https://www.google.com.au/maps/place/Canberra+Contemporary+Art+Space/@${result.obj.location.coordinates[1]},${result.obj.location.coordinates[0]}/data=!4m8!1m2!2m1!1scanberra+matthew+art!3m4!1s0x6b164d68dafc92e9:0xdb8ae7dae326ba86!8m2!3d-35.277908!4d149.137891?hl=en`;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  #app .blue-grey.darken-2 {
    background-color: #455a64 !important;
    border-color: #455a64 !important;
  }
  #app .title--secondary {
    padding-bottom: 0;
  }
  #app .title--primary {
    padding-top: 0;
  }
  #app .teal--text {
    color: #03A8B2!important;
  }
  #app .teal {
    background-color: #03A8B2!important;
    border-color: #03A8B2!important;
  }
  #app .button--directions {
    margin-right: 0;
  }
  #app .expansion-panel {
    box-shadow: none;
  }
  #app .list {
    padding-bottom: 0;
    padding-top: 0;
  }
</style>
