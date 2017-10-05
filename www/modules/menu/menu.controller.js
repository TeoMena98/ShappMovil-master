angular.module('shapp').controller('MenuCtrl', MenuCtrl);

function MenuCtrl($scope, $sessionStorage, urlImage, $cordovaFacebook, FbService, $state){

	var vm = this;
	$scope.$storage = $sessionStorage;
  	vm.urlImage = urlImage;
  	var fbOptions={
        url: "https://fb.me/1706798552903362",
        picture:"https://placehold.it/150x150"
    };
    vm.inviteFriend = function(){
    	facebookConnectPlugin.appInvite(fbOptions,
	        function(postId){
	            console.log("success");
	            console.log(postId);
	        },
	        function(error){
	            console.log("failure");
	            console.log(error);
	        }
	    );
    }
    if(ionic.Platform.isAndroid()){
    	document.getElementsByTagName('body')[0].classList.remove('platform-ios')
    }
    vm.logout = function(){
    	localStorage.removeItem('uuid')
        $scope.$storage.validSesion = true
        $scope.$storage.typeBlock = 'block'
    	$state.go('loginHome');
    }
    vm.next = function(url){
        $state.go('app.'+url);
    }
}
	