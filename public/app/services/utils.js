'use strict';
angular.module('utils', [])

.factory('utilService', function($http, $location, $window, $q, $state, $timeout, BASE_URL){
  var factory = {};
  var defer = $q.defer();

  factory.getData = function(url){
       var url = BASE_URL + '/events';
    return $http.get(url).then(function success(response){
        var data = response.data.data;
        // console.log(data)
        return data;     
     }, function error(err){
       console.log("error", err);
     });

  }

    

  factory.sendData = function(data){
      var url = BASE_URL + '/events'
     $http.post(url, data).then(function success(response){
          console.log("response", response);
          // $state.go('login');
      }, function error(err){
        console.log("error", err);
      });
  }
  return factory;
});
