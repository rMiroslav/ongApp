(function(){
  'use strict';
angular.module('dash')

.controller('DashController', DashController);
DashController.$inject = ['authService', '$http', 'BASE_URL', 'utilService', 'moment'];

function DashController(authService, $http, BASE_URL, utilService, moment){
  var vm = this;

  function init(){
 
  }
  
  init();
}

})()
