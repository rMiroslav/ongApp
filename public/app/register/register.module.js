'use strict';
angular.module('register',[])

.config(config);
config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider', '$locationProvider'];
function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
  $stateProvider
   .state('register', {
       url: '/register',
       templateUrl: 'app/register/register.html',
       controllerAs:'vm',
       controller:'RegisterController'
     })
}

