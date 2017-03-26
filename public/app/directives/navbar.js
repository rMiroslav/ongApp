'use strict';
angular.module('nav',[])

.directive('navbar', function(){
  return {
    restrict:'EA',
    templateUrl:'app/directives/navbar.html',
    // controllerAs: 'vm',
    // controller:function(){
    //   var vm = this;
    // } App.initSidebar();
  }
});
