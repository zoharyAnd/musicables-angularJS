'use strict';


angular.module('aboutModule', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/about', {
    templateUrl: './View/about.html',
    controller: 'aboutController'
  });
}])

angular.module('aboutModule').controller('aboutController', ['$scope', function($scope) {
  //console.log($scope);
  $scope.current_page = "About PAGE ";
}]);