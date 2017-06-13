(function(){
    'use strict';

    angular.module('events')

    .controller('ListController', ListController);
    ListController.$inject = ['authService', '$http', 'BASE_URL', 'utilService'];

    function ListController(authService, $http, BASE_URL, utilService){
          var vm = this;
  
  var ong = JSON.parse(localStorage.getItem("User"))

    function init(){
    utilService.getData().then(function(response){
      vm.events = response;
      vm.events.forEach(function(event){
        // event.start = moment(event.start).utcOffset('+0200').format('l LT');
      });

      console.log(response)
    })
  }
  
  init();
}

})()