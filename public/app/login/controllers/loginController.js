(function(){
    'use strict';
    angular.module('login')

    .controller('LoginController', LoginController);
    LoginController.$inject = ['authService', '$http', 'BASE_URL'];
    function LoginController(authService, $http, BASE_URL){
          var vm = this;
          vm.success = false;
          vm.error = false;
  // vm.volunteer = {
  //   email:'volunteer1@email.com',
  //   password:'volunteer',
  //   role:'volunteer'
  // }
  vm.volunteer = {
    email:'',
    password:'',
    role:'volunteer'
  }

  vm.login = function(){
    // console.log(authService);
    if(vm.volunteer.email != '' && vm.volunteer.password != ''){
        authService.getUser(vm.volunteer).then(function(response){
          if(response){
            vm.success = true;
          }else{
            vm.error = true;
          }
            console.log(response)
          });
    }
   

  }

    }
})()