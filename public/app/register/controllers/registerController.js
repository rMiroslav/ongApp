(function(){
    'use strict';
    angular.module('register')

.controller('RegisterController', RegisterController);
RegisterController.$inject = ['authService', '$state'];

function RegisterController(authService, $state){
  var vm = this;
  vm.success = false;
  vm.error = false;
  vm.alertSuccess = '';
  vm.alertError = '';
  vm.user = {
    email:'',
    password:'',
    role:'volunteer'
  }
  
vm.register = function(){
  authService.register(vm.user).then(function(response){
    if(response.success){
        vm.success = true;
        vm.alertSuccess = response.message;
        $state.go('login');
    }else{
      vm.error = true;
      vm.alertError = response.message;
    }
    console.log('result',response)
  })
}
}
})()