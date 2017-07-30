<template>
  <div class="location-search">
    <form v-on:submit.prevent="onSubmit">
      <v-toolbar class="white" dense>
        <v-text-field v-if="!searchDisabled" prepend-icon="search" hide-details single-line v-model="searchText" @keyup.enter="submit"></v-text-field>
        <v-text-field v-else disabled prepend-icon="search" hide-details single-line v-model="searchText"></v-text-field>

        <v-btn icon @click.native="getGeoLocation">
          <v-icon>my_location</v-icon>
        </v-btn>
      </v-toolbar>
      <p class="location--current" v-if="locationCurrent">Your current location: <strong>{{ locationCurrent }}</strong></p>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'location-search',
    methods: {
      getGeoLocation() {
        const self = this;

        self.searchDisabled = true;

        //..
        navigator.geolocation.getCurrentPosition(function(position) {
          self.geocoder.reverseGeocode({
            prox: position.coords.latitude + ',' + position.coords.longitude,
            mode: 'retrieveAddresses',
            maxresults: 1
          }, (result) => {
            let location = result.Response.View[0].Result[0];

            // console.log(location.Location.Address);
            // console.log(position.coords.latitude + ',' + position.coords.longitude);

            self.searchDisabled = false;
            self.locationCurrent = location.Location.Address.District + ', ' + location.Location.Address.PostalCode;

            //..
            bus.$emit('location', location.Location.Address.District,  position.coords.latitude, position.coords.longitude);

            // self.onSubmit();
          }, function(e) { console.error(e); });
        });

      },
      onSubmit() {
        const self = this;

        // Create the parameters for the geocoding request:
        let geocodingParams = {
          searchText: self.searchText
        };

        // Define a callback function to process the geocoding response:
        let onResult = function(result) {
          let locations = result.Response.View[0].Result, position, marker;

          let locationName = locations[0].Location.Address.District;
          let lat = locations[0].Location.DisplayPosition.Latitude;
          let lng = locations[0].Location.DisplayPosition.Longitude;

          self.locationCurrent = locationName;

          //..
          bus.$emit('location', locationName, lng, lat);
        };

        // Call the geocode method with the geocoding parameters,
        // the callback and an error callback function (called if a
        // communication error occurs):
        self.geocoder.geocode(geocodingParams, onResult, function(e) {
          console.error(e);
        });
      }
    },
    data () {
      return {
        searchDisabled: false,
        searchText: '',
        locationCurrent: null,
        locationLat: 0,
        locationLng: 0,
        geocoder: null
      }
    },
    mounted() {
      const self = this;
      const H = window.H;

      //..
      let platform = new H.service.Platform({
        'app_id': 'yrYbAjz8cKyLCTRkeSd9',
        'app_code': 'c_a1hDQ58z356ZuVLn0nqg'
      });

      // Get an instance of the geocoding service:
      self.geocoder = platform.getGeocodingService();

      // Check whether geolocation is available
      if ("geolocation" in navigator) {
        self.getGeoLocation();
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .location--current {
    margin-bottom: 0;
    margin-top: 10px;
  }
</style>
