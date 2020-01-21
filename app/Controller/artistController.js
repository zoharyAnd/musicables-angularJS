'use strict';


angular.module('artistModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/artist', {
    templateUrl: './View/artist.html',
    controller: 'artistController'
  });
}])

angular.module('artistModule').controller('artistController', ['$scope', '$http', function($scope, $http) {
  $('.searched-artists').hide();

    //ARTISTS
  $scope.artists = []; 
  $http({
    method: 'get', 
    url: 'http://api.napster.com/v2.2/artists/top?apikey=your_napster_apiKey'
    
  }).then(function (response) {
      
      var data = response.data.artists;
      for(var i=0; i < data.length; i++){
        var allArtists = {
            index: i,
            id: data[i].id,
            name: data[i].name.toLowerCase(),
            image: 'https://api.napster.com/imageserver/v2/artists/'+data[i].id+'/images/500x500.jpg',
            nbAlbums: data[i].albumGroups.main.length,
            bio: data[i].bios[0].bio,
            bioAuthor: data[i].bios[0].author,
            blurb: data[i].blurbs[0]
        };
        $scope.artists.push(allArtists);
      }
    },function (error){
      console.log(error, 'can not get data.');
  }); //end request

  //onclick of show modal 
  $scope.showDetails = function(artistIndex){
    var artistId = $scope.artists[artistIndex].id;
    var artistImage = $scope.artists[artistIndex].image;
    var artistName = $scope.artists[artistIndex].name;
    var artistBio = $scope.artists[artistIndex].bio;
    var artistBioAuthor = $scope.artists[artistIndex].bioAuthor;
    var artistBioB = $scope.artists[artistIndex].blurb;
    
    showArtistDetails(artistId, artistImage, artistName, artistBio, artistBioAuthor, artistBioB);
  }; // end show details

  $scope.showDetailsSearched = function(artistIndex){
    var artistId = $scope.searchedArtists[artistIndex].id;
    var artistImage = $scope.searchedArtists[artistIndex].image;
    var artistName = $scope.searchedArtists[artistIndex].name;
    var artistBio = $scope.searchedArtists[artistIndex].bio;
    var artistBioAuthor = $scope.artists[artistIndex].bioAuthor;
    var artistBioB = $scope.artists[artistIndex].blurb;

    showArtistDetails(artistId, artistImage, artistName, artistBio, artistBioAuthor, artistBioB);
  }; // end show details searched


  //SEARCH ARTIST
  $scope.searchArtist = function (){
    var artistName = $('#searched-artist').val();

    $scope.searchedArtists = []; 
    $http({
      method: 'get', 
      url: 'http://api.napster.com/v2.2/search?apikey=your_napster_apiKey&query='+artistName+'&type=artist'
      
    }).then(function (response) {
        
        var data = response.data.search.data.artists;
        for(var i=0; i < data.length; i++){
          var allFoundArtists = {
            index: i,
            id: data[i].id,
            name: data[i].name.toLowerCase(),
            image: 'https://api.napster.com/imageserver/v2/artists/'+data[i].id+'/images/500x500.jpg',
            nbAlbums: data[i].albumGroups.main.length,
            bio: data[i].bios[0].bio,
            bioAuthor: data[i].bios[0].author,
            blurb: data[i].blurbs[0]
          };
          $scope.searchedArtists.push(allFoundArtists);
        }
      },function (error){
        console.log(error, 'can not get data.');
    }); //end request

    $('.top-artists').hide();
    $('.searched-artists').show();
  }; //end searchArtist

}]); //end scope

