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
 MainController.$inject = ['$http', '$location', '$window', 'authService','moment', 'utilService', 'BASE_URL'];



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
   .state('reset', {
     url:'/resetPassword',
     templateUrl:'app/login/reset.html',
     controllerAs: 'vm',
     controller:'MainController'
   })
    .state('unactive', {
     url: '/unactive',
     templateUrl: 'app/login/unactiveAccount.html',
     controllerAs:'vm',
     controller:'WebController',
    //  resolve:{
    //    redirectIfActive: function(authService){
    //        return authService.isUnactive()
    //    }
    //  }
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

 function MainController($http, $location, $window, authService, moment, utilService, BASE_URL){
  var vm = this;
  // console.log(utilService.getData())
  // var url = BASE_URL + '/api/findOne';
  //   var params = JSON.parse(localStorage.getItem('User')).email;
  //   utilService.getData(url, params).then(function(response){
  //     console.log(response)
  //       vm.currentUser = response;
  //   })
  vm.user = JSON.parse(localStorage.getItem('User'));
  //  console.log(moment(new Date(), 'MM-DD-YYYY HH-mm').format())
     vm.logout = function(){
        authService.logout();
     }

     vm.resetUser = {
       email:'',
       role:''
     }
     vm.reset = function(){
       if(!vm.resetUser){
         vm.resetError = true;
       }
        console.log(vm.resetUser)
        vm.resetSuccess = true;
        vm.resetUser = null;
     }

 }
