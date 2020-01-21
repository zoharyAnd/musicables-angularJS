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
    $scope.title = param +" songs";
    
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

}]); //end scope
