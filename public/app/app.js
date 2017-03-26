'use strict';
 angular.module('volunteer',[
   'ui.router',
   'angularMoment',
   'ui.bootstrap',
   'oc.lazyLoad',
    'auth',
    'volunteer.interceptor',
    'dash',
    'login',
    'web',
    'nav',
    'top',
    'register',
    'web.nav',
    'events',
    'utils',
    'email'
  ])
  .constant('BASE_URL', 'http://localhost:8080')

 .run(['$rootScope', '$state', 'authService','$http','$location', function ($rootScope, $state, authService, $http, $location) {
   $rootScope.$state = $state;

 }])

 .config(config)
 .controller("MainController", MainController);
 config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider', '$locationProvider'];
 MainController.$inject = ['$http', '$location', '$window', 'authService','moment'];



 function config($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
 $httpProvider.interceptors.push('authInterceptor');
   $urlRouterProvider.otherwise(function($injector, $location, $window){
     var $state = $injector.get("$state");
     if(localStorage.getItem("Token") && localStorage.getItem("User")){
       $state.go("main.dashboard");
     }else{
        $state.go("home");
     }

   });
//     $locationProvider.html5Mode({
//       enabled: true,
//       requireBase: false,
//       rewriteLinks: true
// });
    $locationProvider.hashPrefix('');
   $stateProvider

    .state('home', {
     url: '/',
     templateUrl: 'app/web/home.html',
     controllerAs:'vm',
     controller:'WebController'
   })
   
   .state('main', {
     url: '',
     templateUrl: 'app/main.html',
     controllerAs: 'vm',
     controller:'MainController',
     abstract: true,
      resolve:{
         redirectIfNotAuthenticated :function(authService){
           return authService.isLoggedin()
         }
      }
   }) 
  
 }

 function MainController($http, $location, $window, authService, moment){
  var vm = this;
  //  console.log(moment(new Date(), 'MM-DD-YYYY HH-mm').format())
     vm.logout = function(){
        authService.logout();
     }

 }
