angular.module('shapp').controller('BrandCtrl', BrandCtrl);

function BrandCtrl($ionicScrollDelegate, loading, $ionicPopup,$scope, $cordovaToast, $sessionStorage, $q, $state, $ionicLoading, $window, $stateParams, $timeout, urlImage, FbService, brandService, $cordovaSocialSharing, misShapp, $ionicSlideBoxDelegate){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;
  loading.show($ionicLoading)
  vm.shapps = misShapp
  $scope.$storage.brand.descripcionAux = $scope.$storage.brand.descripcion
  if($scope.$storage.brand.descripcion.length > 30){
    $scope.$storage.brand.descripcionAux = $scope.$storage.brand.descripcion.substring(0,30) + ' ...'
    $scope.$storage.showMore = false;
  }else{
    $scope.$storage.brand.descripcionAux = $scope.$storage.brand.descripcion
  }
  vm.more = function(){
    $scope.$storage.brand.descripcionAux = $scope.$storage.brand.descripcion
    $scope.$storage.showMore = true
  }
  vm.showBond = function(bond){
    $scope.$storage.bond = bond;
    $state.go('app.bond');
  }
  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });
  vm.form = []
  vm.form.calificacion = 0
  localStorage.calificacion = 0
  vm.plusCal = function (val){
    vm.form.calificacion = val
    localStorage.calificacion = val
  }
  vm.commentAll = function (){
    $state.go('app.commentBrand');
    $scope.closeModal()
  }
  vm.sendComment = function (){
    if(localStorage.calificacion > 0 && localStorage.calificacion < 6){
      return true
    }
    else{
      return false
    }
  }
  vm.send = function (){
    valid = 0
    vm.form.calificacion = localStorage.calificacion
    a = document.getElementById('comment')
    vm.form.comment = angular.element(a).val()
    if(localStorage.calificacion > 0 && localStorage.calificacion < 6){
      valid = 1
      brandService.calificar($scope.$storage.uuid,$scope.$storage.uuid.uuid.id,$scope.$storage.brand.marcaId,vm.form.calificacion)
      .then(function(res){
        console.log(res)
        if(res.data.mensaje.monedas){
          $cordovaToast.showLongBottom('¡Felicidades!, acabas de ganar '+res.data.mensaje.numMonedas+' monedas.')
          $scope.$storage.user.coins = parseInt($scope.$storage.user.coins) + parseInt(res.data.mensaje.numMonedas)
        }
      })
    }
    if(vm.form.comment && vm.form.comment != ''){
      valid = 1
      brandService.comentar($scope.$storage.uuid,$scope.$storage.brand.marcaId,vm.form.comment)
      .then(function(res){
       if(res.data.mensaje.monedas){
          $cordovaToast.showLongBottom('¡Felicidades!, acabas de ganar '+res.data.mensaje.numMonedas+' monedas.')
          $scope.$storage.user.coins = parseInt($scope.$storage.user.coins) + parseInt(res.data.mensaje.numMonedas)
        }
      })
    }
    if(valid == 0){
      $cordovaToast.showLongBottom('Ups, aun te falta colocar una calificación o un comentario');
    }
    if(valid == 1){
      vm.commentAll()
    }
  }
  var commentPopup;
  vm.modalOpen = function (){
    if(!$scope.$storage.uuid.invitado){
      document.getElementsByClassName('backdrop')[0].classList.add('visible')
      document.getElementsByClassName('backdrop')[0].classList.add('active')
      document.getElementsByTagName('body')[0].classList.add('popup-open')
      $scope.commentPopup = $ionicPopup.show({
        templateUrl: 'modules/brand/comment.html',
        scope: $scope,
        cssClass: 'modal-comment'/*,
        buttons: [{
                    text: 'Enviar',
                    type: 'button button-small button-dark',
                    onTap: function(e) {
                      valid = 0
                      vm.form.calificacion = localStorage.calificacion
                      a = document.getElementById('comment')
                      vm.form.comment = angular.element(a).val()
                      if(localStorage.calificacion > 0 && localStorage.calificacion < 6){
                        valid = 1
                        brandService.calificar($scope.$storage.uuid,$scope.$storage.uuid.uuid.id,$scope.$storage.brand.marcaId,vm.form.calificacion)
                        .then(function(res){
                          if(res.data.mensaje.monedas){
                            $cordovaToast.showLongBottom('¡Felicidades!, acabas de ganar '+res.data.mensaje.numMonedas+' monedas.')
                            $scope.$storage.user.coins = parseInt($scope.$storage.user.coins) + parseInt(res.data.mensaje.numMonedas)
                          }
                        })
                      }
                      if(vm.form.comment && vm.form.comment != ''){
                        valid = 1
                        brandService.comentar($scope.$storage.uuid,$scope.$storage.brand.marcaId,vm.form.comment)
                        .then(function(res){
                         if(res.data.mensaje.monedas){
                            $cordovaToast.showLongBottom('¡Felicidades!, acabas de ganar '+res.data.mensaje.numMonedas+' monedas.')
                            $scope.$storage.user.coins = parseInt($scope.$storage.user.coins) + parseInt(res.data.mensaje.numMonedas)
                          }
                        })
                      }
                      if(valid == 0){
                        $cordovaToast.showLongBottom('Ups, aun te falta colocar una calificación o un comentario');
                        e.preventDefault();
                      }
                      
                    }
                  }, 
                  {
                    text: 'Ver comentarios',
                    type: 'button button-small button-positive',
                    onTap: function(e) {
                      vm.commentAll()
                    }
                  }]*/
      });
      console.log($scope.commentPopup)
      $scope.commentPopup.then(function(res) {
        console.log('gracias')
      });
    }
    else{
      $state.go('app.invitado');
    } 
  }
  $scope.closeModal = function(){
    countModal = $ionicPopup['_popupStack'].length
    $ionicPopup['_popupStack'][countModal - 1].remove()
    $ionicPopup['_popupStack'][countModal - 1].hide()
    document.getElementsByClassName('backdrop')[0].classList.remove('visible')
    document.getElementsByClassName('backdrop')[0].classList.remove('active')
    document.getElementsByTagName('body')[0].classList.remove('popup-open')

  }

  vm.expand = function(catalog){
    vm.catalogAux = catalog
    for (var i = 0; i < vm.catalogs.length; i++) {
      for (var j = 0; j < vm.catalogs[i].length; j++) {
        vm.catalogs[i][j].expand = false
      }
    }

    catalog.expand = true;
    vm.subcategory = []
    vm.subcategory2 = []
    if(catalog.cantCategorias>0){
    brandService.getCatalog(catalog.id, $scope.$storage.uuid)
    .then(function(cat){
      if(cat.data.mensaje.listaCategorias != 'vacio'){
        vm.category = []
        pos = 0
        for (var i = 0; i < cat.data.mensaje.listaCategorias.length; i++) {
          if(((i % 3) == 0) && (i != 0)){
            pos++
          }
          if(!vm.category[pos]){
            vm.category[pos] = []
          }
          vm.category[pos].push(cat.data.mensaje.listaCategorias[i]);
        }
        if (catalog.cantProductos > 0) {
          if(((i % 3) == 0) && (i != 0)){
            pos++
          }
          if(!vm.category[pos]){
            vm.category[pos] = []
          }
          vm.category[pos].push({logo:'img/otros.png'});
        }
        $ionicSlideBoxDelegate.$getByHandle('category').update()
        $ionicScrollDelegate.scrollBottom(true)
      }
    })
  }else{
    brandService.getProductsCatalog(catalog.id, $scope.$storage.uuid)
    .then(function(cat){
      var url = $scope.$storage.brand.nombre+"/"+vm.catalogAux.nombre;
      $scope.$storage.productsC = {catalogoId:vm.catalogAux.id,categoryId:-1,url:url};
      $state.go('app.products');
      //catalog.products = cat.data.mensaje;
    })
  }
  }

  vm.liked = false;

  vm.expand1 = function(category){
    for (var i = 0; i < vm.category.length; i++) {
      for (var j = 0; j < vm.category[i].length; j++) {
        vm.category[i][j].expand = false
      }
    }
    vm.categoryAux = category
    if(category.cantProductos <= 0){
      category.expand = true;
      vm.subcategory2 = []
      brandService.getSubCat(category.id, $scope.$storage.uuid)
      .then(function(res){
        if(res.data.mensaje == 'vacio'){
          alert("La categoría está vacía");
        }else{
          vm.subcategory = []
          pos = 0
          for (var i = 0; i < res.data.mensaje.length; i++) {
            if(((i % 3) == 0) && (i != 0)){
              pos++
            }
            if(!vm.subcategory[pos]){
              vm.subcategory[pos] = []
            }
            vm.subcategory[pos].push(res.data.mensaje[i]);
          }
          $ionicSlideBoxDelegate.$getByHandle('subcategory').update()
          $ionicScrollDelegate.scrollBottom(true)
        }
      })
    }else{
      var url = $scope.$storage.brand.nombre+"/"+vm.catalogAux.nombre+"/"+category.nombre;
      $scope.$storage.productsC = {catalogoId:vm.catalogAux.id,categoryId:category.id,url:url};
      $state.go('app.products');
    }
  }
  vm.expand2 = function(category){
    for (var i = 0; i < vm.subcategory.length; i++) {
      for (var j = 0; j < vm.subcategory[i].length; j++) {
        vm.subcategory[i][j].expand = false
      }
    }
    vm.subcategoryAux = category
    if(category.cantProductos <= 0){
      category.expand = true;
      brandService.getSubCat(category.id, $scope.$storage.uuid)
      .then(function(res){
        if(res.data.mensaje == 'vacio'){
          alert("La categoría está vacía");
        }else{
          vm.subcategory2 = []
          pos = 0
          for (var i = 0; i < res.data.mensaje.length; i++) {
            if(((i % 3) == 0) && (i != 0)){
              pos++
            }
            if(!vm.subcategory2[pos]){
              vm.subcategory2[pos] = []
            }
            vm.subcategory2[pos].push(res.data.mensaje[i]);
          }
          $ionicSlideBoxDelegate.$getByHandle('subcategory2').update()
          $ionicScrollDelegate.scrollBottom(true)
        }
      })
    }else{
      var url = $scope.$storage.brand.nombre+"/"+vm.catalogAux.nombre+"/"+category.nombre;
      $scope.$storage.productsC = {catalogoId:vm.catalogAux.id,categoryId:category.id,url:url};
      $state.go('app.products');
    }
    
  }
  vm.expand4 = function(category){
    var url = $scope.$storage.brand.nombre+"/"+vm.catalogAux.nombre
    $scope.$storage.productsC = {catalogoId:vm.catalogAux.id,categoryId:-1,url:url};
    $state.go('app.products');
  }

    brandService.getCatalogs($scope.$storage.brand.marcaId, $scope.$storage.uuid)
    .then(function(res){
      vm.userQualify = res.data.mensaje.userQualify
      localStorage.userQualify = res.data.mensaje.userQualify
      vm.promedio = res.data.mensaje.promedio
      vm.catalogs = []
      pos = 0
      if(res.data.mensaje.listCatalogos != 'vacio'){
        for (var i = 0; i < res.data.mensaje.listCatalogos.length; i++) {
          if(((i % 3) == 0) && (i != 0)){
            pos++
          }
          if(!vm.catalogs[pos]){
            vm.catalogs[pos] = []
          }
          vm.catalogs[pos].push(res.data.mensaje.listCatalogos[i]);
        }
      }
      $ionicSlideBoxDelegate.$getByHandle('catalogs').update()
      loading.hide($ionicLoading)

      /*for (var i = vm.catalogs.length - 1; i >= 0; i--) {
        vm.catalogs[i].icon = 'ion-android-favorite-outline';
      }*/
    })
    if(!$scope.$storage.uuid.invitado){
      brandService.isFollowing($scope.$storage.brand.marcaId, $scope.$storage.uuid)
      .then(function(res){
        vm.liked = res.data.mensaje;
        if(vm.liked){
          vm.icon ='ion-android-favorite';
        }else{
          vm.icon = 'ion-android-favorite-outline';
        }
      })
    }
    else{
      vm.icon = 'ion-android-favorite-outline';
    }

  var getPromos = function (){
    brandService.getPromos($scope.$storage.brand.marcaId, $scope.$storage.uuid)
    .success(function(res) {
      vm.promos = []
      pos = 0
      for (var i = 0; i < res.mensaje.length; i++) {
        if(((i % 3) == 0) && (i != 0)){
          pos++
        }
        if(!vm.promos[pos]){
          vm.promos[pos] = []
        }
        vm.promos[pos].push(res.mensaje[i]);
      }
      $ionicSlideBoxDelegate.$getByHandle('promos').update()
    })
    .error(function(err) {
      console.error(err);
    });
  }

  var init = function(){
    //isFollowing();
    getPromos();
    //getCatalogs();
  }

  init();

  vm.like = function(){
    if(!$scope.$storage.uuid.invitado){
      vm.liked = !vm.liked;
      brandService.setFollow($scope.$storage.brand.marcaId, $scope.$storage.uuid, vm.liked)
      .then(function(res){
        if(vm.liked){
          page = vm.shapps.data.length - 1
          posPage = vm.shapps.data[page].length - 1
          vm.shapps.data[page].splice(posPage,1);
          if(vm.shapps.data[page].length < 3){
            vm.shapps.data[page].push($scope.$storage.brand)
          }
          else{
            vm.shapps.data[page + 1] = []
            vm.shapps.data[page + 1].push($scope.$storage.brand)
          }
          if(vm.shapps.data[page].length < 3){
            vm.shapps.data[page].push({logo:'img/agrega.png'})
          }
          else{
            vm.shapps.data[page + 1] = []
            vm.shapps.data[page + 1].push({logo:'img/agrega.png'})
          }

        }
        else{
          var shappsAux = vm.shapps.data
          for (var i = 0; i < shappsAux.length; i++) {
            for (var j = 0; j < shappsAux[i].length; j++) {
              if($scope.$storage.brand.marcaId == shappsAux[i][j].marcaId){
                shappsAux[i].splice(j,1)
              }
            }
          }
          pos = 0
          vm.shapps.data = []
          for (var i = 0; i < shappsAux.length; i++) {
            for (var j = 0; j < shappsAux[i].length; j++) {
              if(!vm.shapps.data[pos]){
                vm.shapps.data[pos] = []
              }
              if(vm.shapps.data[pos].length > 2){
                pos++
              }
              if(!vm.shapps.data[pos]){
                vm.shapps.data[pos] = []
              }
              vm.shapps.data[pos].push(shappsAux[i][j]);
            }
          }
        }
        var times = res.data.mensaje.cantidad;
        if(res.data.mensaje.monedas){
          $cordovaToast.showLongBottom('Felicidades, acabas de ganar ' + res.data.mensaje.numMonedas + ' monedas para comprar bonos en Shapp');
          $scope.$storage.user.coins = parseInt($scope.$storage.user.coins) + parseInt(res.data.mensaje.numMonedas)
        }else if(times != 0){
          if(times<2){
            $cordovaToast.showLongBottom('Si sigues otra marca ganarás 2 monedas Shapp, y más monedas son más bonos :D');
          }else if(times<7 && (7-times)<4){
            $cordovaToast.showLongBottom('Sólo te faltan seguir '+ (7-times) +' marcas para ganar 10 monedas Shapp, ¡Wow! son muchas monedas');
          }
        }
      })
      if(vm.liked){
        vm.icon ='ion-android-favorite';
      }else{
        vm.icon = 'ion-android-favorite-outline';
      }
    }
    else{
      $state.go('app.invitado');
    }
  }

  vm.likedC = function(catalog){
    if(catalog.icon =='ion-android-favorite'){
      catalog.icon = 'ion-android-favorite-outline';
    }else{
      vm.icon = 'ion-android-favorite';
      catalog.icon = 'ion-android-favorite';
      if(!vm.liked){
        vm.like();
      }
    }
  }

  vm.share = function() {
    $cordovaSocialSharing.share($scope.$storage.brand.descripcion, $scope.$storage.brand.nombre, urlImage + $scope.$storage.brand.logo, 'http://www.shapp.com.co');
    data = {};
    /*data.name = $scope.$storage.brand.nombre;
    data.link = 'http://www.shapp.com.co';
    data.pic = urlImage + $scope.$storage.brand.logo;
    data.caption = 'visto en Shapp';
    data.desc = $scope.$storage.brand.descripcion;*/
    //FbService.share(data);
    brandService.reportShare($scope.$storage.brand.marcaId, $scope.$storage.uuid)
    .then(function(res){
      alert(JSON.stringify(res));
      var times = res.data.mensaje.cantidad;
      if(res.data.mensaje.monedas){
        $cordovaToast.showLongBottom('Felicidades, acabas de ganar ' + res.data.mensaje.numMonedas + ' monedas para comprar bonos en Shapp');
      }else if(times != 0 && (4-times)==1){
        $cordovaToast.showLongBottom('Sólo te faltan compartir una marca o producto para ganar 12 monedas Shapp, ¡Wow! son muchas monedas');
      }
    })
  }
  vm.videos = function() {
    brandService.validVideo($scope.$storage.uuid,$scope.$storage.brand.marcaId)
    .then(function(res){
      if(res.data.type == 'OK'){
        $state.go('app.videos');
      }
      else{
        $cordovaToast.showLongBottom(res.data.mensaje);
      }
    })
  }
  vm.maps = function() {
    brandService.validMaps($scope.$storage.uuid,$scope.$storage.brand.marcaId)
    .then(function(res){
      if(res.data.type == 'OK'){
        $state.go('app.map');
      }
      else{
        $cordovaToast.showLongBottom(res.data.mensaje);
      }
    })
  }
  vm.notices = function() {
    brandService.validNotice($scope.$storage.uuid,$scope.$storage.brand.marcaId)
    .then(function(res){
      if(res.data.type == 'OK'){
        $state.go('app.notice');
      }
      else{
        $cordovaToast.showLongBottom(res.data.mensaje);
      }
    })
  }
} 