angular.module('shapp').controller('ForgotPassCtrl', ForgotPassCtrl);

function ForgotPassCtrl($ionicHistory, loading, $scope, loginService, $cordovaToast, $state, $sessionStorage, $ionicLoading){
	var vm = this;
	vm.form = {}
	$scope.$storage = $sessionStorage;
  	$scope.$storage.user = {};

	$ionicLoading.show({
		template: 'Cargando...'
	});

	ionic.DomUtil.ready(function(){
	    $ionicLoading.hide();
	});
	vm.sendEmail = function (){
		if(vm.form.inputName && vm.form.inputName != ''){
			loading.show($ionicLoading)
			loginService.sendEmail(vm.form)
			.then(function(res){
				loading.hide($ionicLoading)
	            //$cordovaToast.showLongBottom(res); 
	            if(res.data.type == 'OK'){
	            	localStorage.correopass = vm.form.inputName
	            	vm.form.inputName = ''
	            	$cordovaToast.showLongBottom(res.data.mensaje); 
	            	$state.go('recovery');
	           	}else{
	           		$cordovaToast.showLongBottom(res.data.mensaje); 
	           	}          
	        });
	    }
	    else{
	    	$cordovaToast.showLongBottom('Por favor ingresa un correo'); 
	    }
	}
	vm.sendPass = function (){
		if(vm.form.pass && vm.form.pass != '' && vm.form.pass2 && vm.form.pass2 != '' && vm.form.codigo && vm.form.codigo != ''){
			if(vm.form.pass == vm.form.pass2){
				vm.form.correo = localStorage.correopass
				loginService.sendPass(vm.form)
				.then(function(res){
					if(res.data.type == 'OK'){
						$cordovaToast.showLongBottom(res.data.mensaje);
						vm.form.pass = '' 
						vm.form.pass2 = '' 
						vm.form.codigo = ''
						$state.go('login');
					}
					else{
						$cordovaToast.showLongBottom('Código incorrecto');
					}
		        });
			}
			else{
				$cordovaToast.showLongBottom('Las contraseñas no coinciden'); 
			}
			
		}
		else{
			$cordovaToast.showLongBottom('Por favor ingresa todos los datos'); 
		}
	}
	vm.backLogin = function(){
		$ionicHistory.goBack()
	}
	
};
