angular.module('register',[])
.controller('RegisterController', ['authService', function(authService){
  var vm = this;
  vm.user = {
    email:'',
    password:'',
    role:''
  }

vm.register = function(){
  authService.register(vm.user)
}
}]);
