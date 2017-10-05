angular.module('shapp').controller('HelpMeCtrl', HelpMeCtrl);

function HelpMeCtrl(helpService, $ionicLoading, loading, $scope, $sessionStorage, $ionicLoading, $state, urlImage, $cordovaSocialSharing, $cordovaToast){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;

  vm.sendMail = function(){
    loading.show($ionicLoading)
    helpService.sendEmail(vm.form.help, $scope.$storage.uuid)
    .then(function(res){
      console.log(res)
      loading.hide($ionicLoading)
    })
  }
} 