document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      beers: [],
      newBeerName: "",
      newBeerStyle: "",
      newBeerAlcohol: ""
    },
    mounted: function() {
      $.get("/api/v2/beers", function(responseData) {
        this.beers = responseData;
      }.bind(this));
    },
    methods: {
      addBeer: function() {
        var params = {name: this.newBeerName, style: this.newBeerStyle, alcohol: this.newBeerAlcohol};
        $.post("/api/v2/beers", params, function(responseData) {
          this.beers.push(responseData);
          this.newBeerName = "";
          this.newBeerStyle = "";
          this.newBeerAlcohol = "";
        }.bind(this));
      }
    }
  });
});