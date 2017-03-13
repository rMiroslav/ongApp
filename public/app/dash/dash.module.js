angular.module('dash',['auth', 'nav'])
.controller('DashController', ['authService', '$http', 'BASE_URL', function(authService, $http, BASE_URL){
  var vm = this;

  vm.events = function(){
    $http.get(BASE_URL + '/events').then(function success(response){
      console.log("events", response)

    },function error(error){
      console.log("events", error) 
    })
  }
}]);
