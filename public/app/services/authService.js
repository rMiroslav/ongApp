'use strict';
angular.module('auth', [])

.factory('authService', function($http, $location, $window, $q, $state, $timeout, BASE_URL){
  var factory = {};
  var defer = $q.defer();

  factory.register = function(data){
     var url = BASE_URL + '/api/register';

     return $http.post(url, data).then(function success(response){
       var response = response.data
      console.log("response", response);
          // $state.go('login');
       return response
          
      }, function error(err){
        console.log("error", err);
      });
  }

  factory.getUser = function(data){
    var url = BASE_URL + '/api/login';
    return $http.post(url, data).then(function success(response){
       var response = response.data;
       storeUser(response);
       return response.user;
         
     }, function error(err){
       console.log("error", err);
     });
  }

  function storeUser(response){
   var token = response.token;
   var user = response.user;
   console.log(user)
    if(!token && !user){
      $state.go('login');
    }else if(user.active == 0){
      console.log(user)
        $state.go('unactive');
    }else{
     localStorage.setItem("Token", JSON.stringify(token));
      localStorage.setItem("User", JSON.stringify(user));
      // $location.path('/');
      $state.go('main.dashboard');
    }
  }

  factory.isUnactive = function(){
    var user = JSON.parse(localStorage.getItem('User'));
    console.log(user)
    if(user.active = 0){
      defer.resolve();
    }else{
          $timeout(function(){
            $state.go('login');
        })
            defer.reject();
        }
        return defer.promise;
  }

  factory.isLoggedin = function(user){
    if(localStorage.getItem("Token")){    
      //  $timeout(function(){
        // $state.go('main.dashboard');
    //  })   
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
