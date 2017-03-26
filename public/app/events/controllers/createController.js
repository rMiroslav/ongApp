(function(){
    'use strict';

    angular.module('events')

    .controller('CreateController', CreateController);
    CreateController.$inject = ['authService', '$http', 'BASE_URL', 'utilService'];

    function CreateController(authService, $http, BASE_URL, utilService){
          var vm = this;
  
  var ong = JSON.parse(localStorage.getItem("User"))


  vm.event = {
    title:'',
    createdBy: ong.email,
    location: '',
    volunteers: '',
    content: '',
    start: new Date(),
    ongoing:'In process',
    ong_id: ong.id,
    tags: '',
    phone: '',
    address: ''
  }

  vm.create = function(){
    utilService.sendData(vm.event);
     vm.event = null;
  }
    }
})()