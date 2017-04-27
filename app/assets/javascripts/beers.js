document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      beers: [],
      errors: [],
      newBeerName: "",
      newBeerStyle: "",
      newBeerAlcohol: "",
      nameFilter: "",
      styleFilter: "",
      sortAttribute: "name"
    },
    computed: {
      filteredBeers: function() {
        var lowerNameFilter = this.nameFilter.toLowerCase();
        var lowerStyleFilter = this.styleFilter.toLowerCase();
        var filtered = this.beers.filter(function(beer) {
          var lowerName = beer.name.toLowerCase();
          var lowerStyle = beer.style.toLowerCase();
          return lowerName.indexOf(lowerNameFilter) !== -1 && lowerStyle.indexOf(lowerStyleFilter) !== -1;
        });
        var sorted = filtered.sort(function(beer1, beer2) {
          return beer1[this.sortAttribute] > beer2[this.sortAttribute];
        }.bind(this));
        return sorted;
      }
    },
    mounted: function() {
      $.get("/api/v2/beers", function(responseData) {
        this.beers = responseData;
      }.bind(this));
    },
    methods: {
      setSortAttribute: function(inputAttribute) {
        this.sortAttribute = inputAttribute;
      },
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