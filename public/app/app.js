 angular.module('volunteer',[
   'ui.router',
   'angularMoment',
    'auth',
    'volunteer.interceptor',
    'dash',
    'login',
    'web',
    'nav',
    'register',
    'web.nav',
    'events',
    'utils'
  ])
  .constant('BASE_URL', 'http://localhost:8080')

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
    $locationProvider.hashPrefix('');
   $stateProvider
   .state('main', {
     url: '/',
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
     })
     .state('main.email', {
       url: '^/email',
       template:"Email Page"
     })
     .state('main.create', {
       url: '^/create',
       templateUrl:"app/events/create.html",
       controllerAs:'vm',
       controller:'CreateController'
     })
 }])
 .controller("MainController",['$http', '$location', '$window', 'authService','moment', function($http, $location, $window, authService, moment){
   var vm = this;
   console.log(moment(new Date(), 'MM-DD-YYYY HH-mm').format())
     vm.logout = function(){

        authService.logout();
    }
 }]);
