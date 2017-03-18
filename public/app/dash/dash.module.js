angular.module('dash',['auth', 'nav'])
.controller('DashController', ['authService', '$http', 'BASE_URL', 'utilService', 'moment', function(authService, $http, BASE_URL, utilService, moment){
  var vm = this;

  function init(){
    utilService.getData().then(function(response){
      vm.events = response;
      vm.events.forEach(function(event){
        event.start = moment(event.start).utcOffset('+0200').format('l LT');
      });

      console.log(response)
    })
  }
  
  init();
}]);
