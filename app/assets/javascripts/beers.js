document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      beers: [],
      errors: [],
      newBeerName: "",
      newBeerStyle: "",
      newBeerAlcohol: "",
      nameFilter: ""
    },
    computed: {
      filteredBeers: function() {
        var lowerNameFilter = this.nameFilter.toLowerCase();
        var filtered = this.beers.filter(function(beer) {
          var lowerName = beer.name.toLowerCase();
          return lowerName.indexOf(lowerNameFilter) !== -1;
        });
        return filtered;
      }
    },
    mounted: function() {
      $.get("/api/v2/beers", function(responseData) {
        this.beers = responseData;
      }.bind(this));
    },
    methods: {
      addBeer: function() {
        this.errors = [];
        var params = {name: this.newBeerName, style: this.newBeerStyle, alcohol: this.newBeerAlcohol};
        $.post("/api/v2/beers", params, function(responseData) {
          this.beers.push(responseData);
          this.newBeerName = "";
          this.newBeerStyle = "";
          this.newBeerAlcohol = "";
        }.bind(this)).fail(function(response) {
          this.errors = response.responseJSON.errors;
        }.bind(this));
      }
    }
  });
});