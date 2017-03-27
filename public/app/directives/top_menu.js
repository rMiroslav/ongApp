angular.module('top',[])

.directive('topbar', function(){
  return {
    restrict:'EA',
    templateUrl:'app/directives/top_menu.html',
    controllerAs: 'vm',
    bindToController: true,
    controller:function($scope){
      var vm = this;
      vm.user  =  JSON.parse(localStorage.getItem("User"))
      console.log(vm.user)
    }
  }
});