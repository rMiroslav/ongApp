angular.module('top',[])

.directive('topbar', function(){
  return {
    restrict:'EA',
    templateUrl:'app/directives/top_menu.html',
    // controllerAs: 'vm',
    // controller:function(){
    //   var vm = this;
    // }
  }
});