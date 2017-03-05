 angular.module('volunteer',[
   'ui.router',
    'auth',
    'volunteer.interceptor',
    'dash',
    'login',
    'web',
    'nav',
    'register',
    'web.nav'
  ])

 .run(['$rootScope', '$state', 'authService','$http','$location', function ($rootScope, $state, authService, $http, $location) {
   $rootScope.$state = $state;

 }])
 .config(['$stateProvider','$urlRouterProvider','$httpProvider', '$locationProvider',  function($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){
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
    $locationProvider.hashPrefix('!');
   $stateProvider
   .state('main', {
     url: '/',
     templateUrl: 'app/main.html',
     abstract: true,
      resolve:{
         redirectIfNotAuthenticated :function(authService){
           return authService.isLoggedin()
         }
      }
   })

   .state('home', {
     url: '/home',
     templateUrl: 'app/web/home.html',
     controllerAs:'vm',
     controller:'WebController'
   })
     .state('login', {
       url: '/login',
       templateUrl: 'app/auth/login.html',
       controllerAs:'vm',
       controller:'LoginController'
     })
     .state('register', {
       url: '/register',
       templateUrl: 'app/register/register.html',
       controllerAs:'vm',
       controller:'RegisterController'
     })
     .state('main.dashboard', {
       url: '^/dashboard',
       templateUrl: 'app/dash/dashboard.html',
       controllerAs:'vm',
       controller:'DashController',
      //  resolve:{
      //     redirectIfNotAuthenticated :function(authService){
      //       return authService.isLoggedin()
      //     }
      //  }
     })
     .state('main.email', {
       url: '^/email',
       template:"Email Page"
      //  templateUrl: 'app/dash/dashboard.html',
      //  controllerAs:'vm',
      //  controller:'DashController',
      //  resolve:{
      //     redirectIfNotAuthenticated :function(authService){
      //       return authService.isLoggedin()
      //     }
      //  }
     })
 }])
 .controller("MainController",['$http', '$location', '$window', 'authService', function($http, $location, $window, authService){
   var vm = this;

 }]);
