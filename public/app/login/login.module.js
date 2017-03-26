'use strict';
angular.module('login',['auth'])

.config(config);
config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
  $stateProvider
    .state('login', {
       url: '/login',
       templateUrl: 'app/login/login.html',
       controllerAs:'vm',
       controller:'LoginController'
     })
}

