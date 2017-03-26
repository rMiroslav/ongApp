angular.module('events',['auth'])

.config(config);
config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
  $stateProvider
   .state('main.events', {
       url: '/events',
       abstract: true,
       template:"<ui-view></ui-view>"
     })
     .state('main.events.create', {
       url: '/create',
       templateUrl:"app/events/create.html",
       controllerAs:'vm',
       controller:'CreateController'
     })
     .state('main.events.list', {
       url: '/list',
       templateUrl:"app/events/events.list.html",
       controllerAs:'vm',
       controller:'ListController'
     })
     .state('main.events.detail', {
       url: '/list',
       templateUrl:"app/events/events.detail.html",
       controllerAs:'vm',
       controller:'DetailController'
     })
}

