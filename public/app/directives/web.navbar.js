angular.module('web.nav',[])

.directive('webNavbar', function(){
  return {
    restrict:'EA',
    templateUrl:'app/directives/web.navbar.html',
    controllerAs: 'vm',
    bindToController: true,
    controller:function($scope){
      var vm = this;
      vm.isNotLoggedin = function(){
        return (localStorage.getItem("User")) ? false : true;
        App.initSidebar();
      }
    }
  }
});
