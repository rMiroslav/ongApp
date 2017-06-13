angular.module('top',[])

.directive('topbar', function(){
  return {
    restrict:'EA',
    templateUrl:'app/directives/top_menu.html',
    controllerAs: 'vm',
    bindToController: true,
    controller:function($scope, authService){
      var vm = this;
      vm.user  =  JSON.parse(localStorage.getItem("User"))
      console.log(vm.user)


            $('button[data-click="sidebar-toggled"]').toggle(function () {
                $('#sidebar').css( {"left": "0px", "position":"fixed"});
            }, function () {
                $('#sidebar').css({"left": "-220px", "position":"absolute"});
            });


        vm.logout = function(){
        authService.logout();
     }

    }
  }
});