'use strict';


angular.module('homepageModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: './View/homepage.html',
    controller: 'homepageController'
  });
}])

angular.module('homepageModule').controller('homepageController', ['$scope', '$http', function($scope, $http) {
  $('.searched-songs').hide();

  //TOP TRACKS
  $scope.songs = []; 
  
  $http({
    method: 'get', 
    url: 'http://api.napster.com/v2.2/tracks/top?apikey=your_napster_apiKey'
    
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

  // GENRES
  $scope.genres = []; 
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
      }
    },function (error){
      console.log(error, 'can not get data.');
  }); //end request

  
  $scope.playSound = function(audioUrl, audioId) {
    createjs.Sound.registerSound(audioUrl, audioId);
    createjs.Sound.play(audioId);
  };
  
  $scope.pauseSound = function(audioId) {
    createjs.Sound.stop(audioId);
  };

  $scope.searchTrack = function (){
    var trackName = $('#searched-track').val();

    $scope.searchedTracks = []; 
    $http({
      method: 'get', 
      url: 'http://api.napster.com/v2.2/search?apikey=your_napster_apiKey&query='+trackName+'&type=track'
      
    }).then(function (response) {
        
        var data = response.data.search.data.tracks;
        for(var i=0; i < data.length; i++){
          var allFoundTracks = {
            id: data[i].id,
            name: data[i].name.toLowerCase(),
            artist: data[i].artistName.toLowerCase(),
            image: 'https://api.napster.com/imageserver/v2/albums/'+data[i].albumId.toLowerCase()+'/images/500x500.jpg',
            album: data[i].albumName.toLowerCase(),
            audioUrl: data[i].previewURL
          };
          $scope.searchedTracks.push(allFoundTracks);
        }
      },function (error){
        console.log(error, 'can not get data.');
    }); //end request

    $('.all-songs').hide();
    $('.searched-songs').show();
  }; //end searchTrack
  
}]);//end scope

