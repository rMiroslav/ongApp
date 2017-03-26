'use strict';
angular.module('email',['auth', 'nav'])

.config(config);
config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
  $stateProvider 
        .state('main.email', {
       url: '/email',
       abstract:true,
       template:"<ui-view></ui-view>"
     })
      .state('main.email.inbox', {
       url: '/inbox',
       template:"Inbox Page"
     })
}

