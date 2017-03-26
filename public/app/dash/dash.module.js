'use strict';
angular.module('dash',['auth', 'nav'])

.config(config);
config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
  $stateProvider 
     .state('main.dashboard', {
       url: '/dashboard',
       templateUrl: 'app/dash/dashboard.html',
       controllerAs:'vm',
       controller:'DashController',
     })

}


