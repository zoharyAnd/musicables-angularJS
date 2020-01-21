'use strict';


angular.module('genreModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/genre/:genrename', 
  {
    templateUrl: './View/genre.html',
    controller: 'genreController'
  });
}])

angular.module('genreModule').controller('genreController', ['$scope', '$http', '$routeParams', function($scope, $http,  $routeParams) {
    var param = $routeParams.genrename

  // call ALL GENRES to retrieve genreid from its name
  $scope.genres = []; 
  $scope.title = param +" songs";

  $http({
    method: 'get', 
    url: 'http://api.napster.com/v2.2/genres?apikey=your_napster_apiKey'
    
  }).then(function (response) {
      
      var data = response.data.genres;
      for(var i=0; i < data.length; i++){
        var allGenres = {
          id: data[i].id,
          name: data[i].name.toLowerCase(),
        };
        $scope.genres.push(allGenres);
        if (allGenres.name == param) {
          loadGenre(allGenres.id);
        }
      }
    },function (error){
      console.log(error, 'can not get data.');
  }); //end request

  
  function loadGenre (genreid){
    $scope.songs = []; 
    $http({
      method: 'get', 
      url: 'http://api.napster.com/v2.2/genres/'+genreid+'/tracks/top?apikey=your_napster_apiKey'
      
    }).then(function (response) {
        
        var data = response.data.tracks;
        for(var i=0; i < data.length; i++){
          var allSongs = {
            id: data[i].id,
            name: data[i].name.toLowerCase(),
            artist: data[i].artistName.toLowerCase(),
            image: 'https://api.napster.com/imageserver/v2/albums/'+data[i].albumId.toLowerCase()+'/images/500x500.jpg',
            album: data[i].albumName.toLowerCase(),
            audioUrl: data[i].previewURL
          };
          $scope.songs.push(allSongs);
          
        }
      },function (error){
        console.log(error, 'can not get data.');
    }); //end request
  };
    
    $scope.playSound = function(audioUrl, audioId) {
      createjs.Sound.registerSound(audioUrl, audioId);
      createjs.Sound.play(audioId);
    };
    
    $scope.pauseSound = function(audioId) {
      createjs.Sound.stop(audioId);
    };
}]); //end scope