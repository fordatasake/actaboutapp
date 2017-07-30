<template>
  <a :href="setGmapsUrl()">
    <v-btn fab dark small class="button--directions teal white--text">
      <v-icon>directions</v-icon>
    </v-btn>
  </a>
</template>

<script>
export default {
  name: 'map-button',
  props: ["lat", "lng"],
  mounted() {
    // console.log('button', this.lat);

//    this.setGmapsUrl();
  },
  methods: {
    setGmapsUrl() {

      //https://www.google.com.au/maps/@-33.8901565,151.1927602,14z
      return `https://www.google.com.au/maps/@${this.lat},${this.lng},14z`;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #app .button--directions {
    margin-right: 0;
  }
</style>
