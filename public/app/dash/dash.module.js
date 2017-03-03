angular.module('dash',['auth', 'nav'])
.controller('DashController', ['authService', function(authService){
  var vm = this;

  vm.logout = function(){

    authService.logout();
  }
}]);
