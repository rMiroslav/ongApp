angular.module('volunteer.interceptor',[])

.factory('authInterceptor', function($q, $location){
  return {
    request:function(config){
      // console.log(config);
      if(localStorage.getItem("Token")){
        config.headers.Authorization = JSON.parse(localStorage.getItem("Token"));
      }
      return config;
    },
    responseError: function(response){
      console.log(response);
        // $location.path('/login');
      return $q.reject(response);
    }
  }
})
