angular.module('auth', [])

.factory('authService', function($http, $location, $window, $q, $state, $timeout){
  var factory = {};
  var defer = $q.defer();

  factory.register = function(data){
     var url = 'http://localhost:8080/api/register';

      $http.post(url, data).then(function success(response){
          console.log("response", response);
          $location.path('/login');
      }, function error(err){
        console.log("error", err);
      });
  }

  factory.getUser = function(data){
    var url = 'http://localhost:8080/api/login';
     $http.post(url, data).then(function success(response){
       var response = response.data;
      //  return response.user;
        //  console.log("response", response);
         storeUser(response);
     }, function error(err){
       console.log("error", err);
     });
  }

  function storeUser(response){
    token = response.token;
    user = response.user;
    if(!token && !user){
      // $location.path('/login');
      $state.go('login');
    }else{
     localStorage.setItem("Token", JSON.stringify(token));
      localStorage.setItem("User", JSON.stringify(user));
      // $location.path('/');
      $state.go('main.dashboard');
    }
  }

  factory.isLoggedin = function(user){
    if(localStorage.getItem("Token")){
      defer.resolve();
    }else{
      $timeout(function(){
        $state.go('login');
     })
        defer.reject();
    }
    return defer.promise;
  }

factory.logout  = function(){
  localStorage.clear();
  $state.go('login');
  $state.go('login', {}, { reload: 'login' })
}

  return factory;
});
