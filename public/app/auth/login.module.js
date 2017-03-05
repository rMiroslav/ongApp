angular.module('login',['auth'])
.controller('LoginController', ['authService',function(authService){
  var vm = this;

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
   authService.getUser(vm.volunteer);

  }
}]);
