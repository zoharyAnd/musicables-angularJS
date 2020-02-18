'use strict';


angular.module('artistdetailModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/artist/:artistname', {
    templateUrl: './View/artistdetail.html',
    controller: 'artistdetailController'
  });
}])

angular.module('artistdetailModule').controller('artistdetailController', ['$scope', '$http','$routeParams', function($scope, $http,  $routeParams) {
    var param = $routeParams.artistname;
    $scope.title = param;
    
    $scope.theArtist = []; 
    $scope.albumsLinks = "";
    $http({
      method: 'get', 
      url: 'https://api.napster.com/v2.2/search?your_napster_api_key&query='+param+'&type=artist'
      
    }).then(function (response) {
        var data = response.data.search.data.artists;
        for(var i=0; i < data.length; i++){
          if (data[i].name.toLowerCase() == param){
            var allFoundArtists = {
              index: i,
              id: data[i].id,
              name: data[i].name.toLowerCase(),
              image: 'https://api.napster.com/imageserver/v2/artists/'+data[i].id+'/images/500x500.jpg',
              nbAlbums: data[i].albumGroups.main.length,
              bio: data[i].bios[0].bio,
              bioAuthor: data[i].bios[0].author,
              blurb: data[i].blurbs[0],
              loadingAlbums: loadAlbums(data[i].id)
            };
            $scope.theArtist.push(allFoundArtists);
          }
          
          
        } // end FOR
      },function (error){
        console.log(error, 'can not get data.');
    }); //end request

    
   
    //load artist albums 
    $scope.theAlbums = [];
    function loadAlbums (artistId){
      $http({
        method: 'get', 
        url: 'https://api.napster.com/v2.2/artists/'+artistId+'/albums/top?your_napster_api_key'
      }).then(function (response) {
          var data = response.data.albums;
          for(var i=0; i < data.length; i++){
            var allFoundAlbums = {
              index: i,
              id: data[i].id,
              name: data[i].name.toLowerCase(),
              label: data[i].label.toLowerCase(),
              artist: data[i].artistName.toLowerCase(),
              image: 'https://api.napster.com/imageserver/v2/albums/'+data[i].id.toLowerCase()+'/images/500x500.jpg',
              tracks: data[i].trackCount,
              date: formatDate(data[i].released)
            };
            $scope.theAlbums.push(allFoundAlbums);
          }
        },function (error){
          console.log(error, 'can not get data.');
      }); //end request
    }; // end show details

    
    
    //onclick of show modal 
    $scope.showDetails = function(albumId){
      showAlbumDetails(albumId);
    }; // end show details


}]); //end scope
