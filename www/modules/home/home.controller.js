angular.module('shapp').controller('HomeCtrl', HomeCtrl);

function HomeCtrl(loading, $ionicLoading, $scope, $sessionStorage, $timeout, productService, brandService, urlImage, $ionicSlideBoxDelegate, Bonds, Notice, $state, CategorySrv, $ionicPopup, productService, loginService, $cordovaStatusbar, misShapp, $interval, OAuth, $ionicHistory){
  //$cordovaStatusbar.styleHex('#BE1E59');
	var vm = this;
  //loading.show($ionicLoading) 
	$scope.$storage = $sessionStorage;
  $interval(function() {
    $scope.$storage.countShop = ''
    if(!localStorage.shop)
      localStorage.shop = '[]'
    $scope.shop = JSON.parse(localStorage.shop)
    for (var i = 0; i < $scope.shop.length; i++) {
      if($scope.$storage.countShop == '')
        $scope.$storage.countShop = 0
      $scope.$storage.countShop += $scope.shop[i].quantity
    }
  }, 10);
  var txt = $scope.$storage.uuid.uuid.level.split(" ");
  txt[0] = txt[0].split("");
  txt[1] = txt[1].split("");
  $scope.$storage.uuid.uuid.level = ''
  for (var i = 0; i < txt.length; i++) {
    for (var j = 0; j < txt[i].length; j++) {
      if(j != 0){
        $scope.$storage.uuid.uuid.level += txt[i][j].toLowerCase()
      }
      else{
        $scope.$storage.uuid.uuid.level += txt[i][j]
      }
    }
    if(i == 0){
      $scope.$storage.uuid.uuid.level += ' '
    }
  }
  $ionicHistory.clearHistory()
  vm.urlImage = urlImage;
  if(localStorage.validFirtPag == 'true'){
    vm.welcome = {val: true};
    localStorage.validFirtPag = 'false'
  }
  else{
    vm.welcome = {val: false}; //Just for testing
  }

	function change(obj) {
	  obj.val = false;
	}
  $timeout(function(){change(vm.welcome)}, 5000);
  $interval(function(){$ionicSlideBoxDelegate.$getByHandle('shapps').update();$ionicSlideBoxDelegate.$getByHandle('home').update();$ionicSlideBoxDelegate.$getByHandle('reciente').update();$ionicSlideBoxDelegate.$getByHandle('trends').update();$ionicSlideBoxDelegate.$getByHandle('notice').update();$ionicSlideBoxDelegate.$getByHandle('bondsNotice').update();$ionicSlideBoxDelegate.$getByHandle('category').update();$ionicSlideBoxDelegate.$getByHandle('interes').update();}, 1000);
  if($scope.$storage.uuid.invitado == false){
    brandService.getShapps($scope.$storage.uuid)
    .then(function(res){
      vm.shapps = misShapp
      pos = 0
      if(res.data.mensaje != 'vacio'){
        for (var i = 0; i < res.data.mensaje.length; i++) {
          if(((i % 3) == 0) && (i != 0)){
            pos++
          }
          if(!vm.shapps.data[pos]){
            vm.shapps.data[pos] = []
          }
          vm.shapps.data[pos].push(res.data.mensaje[i]);
        }
        if(((i % 3) == 0) && (i != 0)){
          pos++
        }
        if(!vm.shapps.data[pos]){
          vm.shapps.data[pos] = []
        }
        vm.shapps.data[pos].push({logo:'img/agrega.png'});
        console.log(vm.shapps,1,$scope.$storage.uuid.invitado)
      }
      else{
        if(!vm.shapps.data[pos]){
          vm.shapps.data[pos] = []
        }
        vm.shapps.data[pos].push({logo:'img/agrega.png'});
      }
      $ionicSlideBoxDelegate.$getByHandle('shapps').update()
    })
  }
  else{
    vm.shapps = []
    vm.shapps.data = []
    if(!vm.shapps.data[0]){
      vm.shapps.data[0] = []
    }
    vm.shapps.data[0].push({logo:'img/registrate.jpg'});
  }
  brandService.reciente($scope.$storage.uuid)
  .then(function(res){
    vm.reciente = []
    pos = 0
    for (var i = 0; i < res.data.mensaje.length; i++) {
      if(((i % 3) == 0) && (i != 0)){
        pos++
      }
      if(!vm.reciente[pos]){
        vm.reciente[pos] = []
      }
      vm.reciente[pos].push(res.data.mensaje[i]);
    }
    $ionicSlideBoxDelegate.$getByHandle('reciente').update()
  })
  	
  productService.getTrends($scope.$storage.uuid)
  .success(function(res){
    vm.trends = []
    pos = 0
    for (var i = 0; i < res.mensaje.length; i++) {
      if(((i % 3) == 0) && (i != 0)){
        pos++
      }
      if(!vm.trends[pos]){
        vm.trends[pos] = []
      }
      vm.trends[pos].push(res.mensaje[i]);
    }
    $ionicSlideBoxDelegate.$getByHandle('trends').update()
    loading.hide($ionicLoading) 
  })
  /*
  Notice.getNoticeH($scope.$storage.uuid)
  .success(function(res){
    vm.notice = []
    pos = 0
    for (var i = 0; i < res.mensaje.length; i++) {
      if(((i % 3) == 0) && (i != 0)){
        pos++
      }
      if(!vm.notice[pos]){
        vm.notice[pos] = []
      }
      vm.notice[pos].push(res.mensaje[i]);
    }
    $ionicSlideBoxDelegate.$getByHandle('notice').update()
  })
  Bonds.getBondsProm($scope.$storage.uuid)
  .success(function(res){
    //vm.bondsNotice = res.mensaje;
    vm.bondsNotice = []
    pos = 0
    aux = 0
    for (var i = 0; i < res.mensaje.bonos.length; i++) {
      aux = i
      if(((i % 3) == 0) && (i != 0)){
        pos++
      }
      if(!vm.bondsNotice[pos]){
        vm.bondsNotice[pos] = []
      }
      vm.bondsNotice[pos].push(res.mensaje.bonos[i]);
      var posAux = vm.bondsNotice[pos].length - 1
      vm.bondsNotice[pos][posAux].url = res.mensaje.bonos[i].bono;
      console.log(vm.bondsNotice)
    }
    for (var i = 0; i < res.mensaje.promociones.length; i++) {
      aux++
      if((aux % 3) == 0){
        pos++
      }
      if(!vm.bondsNotice[pos]){
        vm.bondsNotice[pos] = []
      }
      vm.bondsNotice[pos].push(res.mensaje.promociones[i]);
    }
    $ionicSlideBoxDelegate.$getByHandle('bondsNotice').update()
  })*/
  CategorySrv.getCategory($scope.$storage.uuid)
  .success(function(res){
    vm.category = []
    pos = 0
    for (var i = 0; i < res.mensaje.length; i++) {
      if(((i % 3) == 0) && (i != 0)){
        pos++
      }
      if(!vm.category[pos]){
        vm.category[pos] = []
      }
      vm.category[pos].push(res.mensaje[i]);
    }
    $ionicSlideBoxDelegate.$getByHandle('category').update()
  })
  if(!$scope.$storage.uuid.invitado){
    loginService.token($scope.$storage.uuid)
    .success(function(res){
      console.log(res)
    })
  }
  vm.showBrand = function(brand){
    $scope.$storage.brand = brand;
    $state.go('app.brand');
  }
  vm.showCategory = function(category){
    $scope.$storage.category = category;
    $state.go('app.BrandByCategory');
  }
  vm.showProduct = function(trend){
    productService.getProducts(trend.idCatalogo, trend.idMenu, $scope.$storage.uuid)
    .then(function(res){
      $scope.$storage.productsList = res.data.mensaje;
      var indexList = 1
      for (var i = 0; i < $scope.$storage.productsList.length; i++) {
        if(trend.id == $scope.$storage.productsList[i].id){
          var indexList = i
        }
      }
      $scope.$storage.productoDetail = {nameProducto:trend.nombre,idProduct:trend.id,indexList:indexList};
      $state.go('app.product');
    })
  }

  vm.openLightbox = function(url){
    $scope.data = {};
    $scope.data.url = url
    var myPopup = $ionicPopup.show({
      templateUrl: 'modules/home/lightbox.html',
      cssClass: 'modal-comment lightbox-modal',
      scope: $scope,
      buttons: [
        { 
          text: '<i class="ion-close-round"></i>',
          type: 'button-clear button-positive', 
        }
      ]
    });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
    });
  }

}
	