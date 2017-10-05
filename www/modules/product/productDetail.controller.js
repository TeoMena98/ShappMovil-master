angular.module('shapp').controller('ProductDetailCtrl', ProductDetailCtrl);

function ProductDetailCtrl($ionicGesture, $ionicModal, brandService, productService, loading, $ionicHistory, $ionicPopup, $scope, $sessionStorage, $state, $ionicLoading, $stateParams, $timeout, urlImage, productDetailService, FbService, $ionicSlideBoxDelegate, $ionicScrollDelegate, $location, $cordovaSocialSharing){
      $scope.offsetHeight = document.getElementById('v').offsetHeight + 'px'
      $scope.display = 'block'
      $scope.$storage = $sessionStorage;
      
      
      $timeout(function(){
        $scope.display = 'none';
        loading.hide($ionicLoading)
        if(localStorage.platform == 'ios'){
          document.getElementById('pAux'+$scope.$storage.productoDetail.idProduct).style.height = '0px'
        }
      }, 3000);
      $scope.myGoBack = function() {
        if(localStorage.platform == 'ios'){
          $ionicHistory.goBack(-2);
        }
        else{
          $ionicHistory.goBack(-1);
        }
      };
      var vm = this;
      vm.userQualify = 'true';
      var idProduct = 0
      var n = 0
      vm.form = []
      vm.form.calificacion = 0
      localStorage.calificacion = 0
      vm.img = [
          'http://lorempixel.com/image_output/nature-q-c-400-300-5.jpg',
          'http://lorempixel.com/image_output/nature-q-c-400-300-1.jpg',
          'http://lorempixel.com/image_output/nature-q-g-400-300-4.jpg',
          'http://lorempixel.com/image_output/nature-q-g-400-300-2.jpg',
          'http://lorempixel.com/image_output/nature-q-c-400-300-6.jpg',
          'http://lorempixel.com/image_output/nature-q-c-400-300-3.jpg',
          ]
      vm.imgAux = [
          'http://lorempixel.com/image_output/nature-q-c-400-300-1.jpg',
          'http://lorempixel.com/image_output/nature-q-g-400-300-4.jpg',
          'http://lorempixel.com/image_output/nature-q-g-400-300-2.jpg',
          'http://lorempixel.com/image_output/nature-q-c-400-300-6.jpg',
          'http://lorempixel.com/image_output/nature-q-c-400-300-5.jpg',
          'http://lorempixel.com/image_output/nature-q-c-400-300-3.jpg',
          ]
      var precio = '1.500'
      var precioAux = '1.700'
      var precioAnt = '1.700'
      var precioAntAux = '1.900'
      var aux = 0;
      vm.urlImage = urlImage;

      loading.show($ionicLoading)

      ionic.DomUtil.ready(function(){
        if(!$scope.$storage.validarModal || $scope.$storage.validarModal == 0){
          id = 'p'+$scope.$storage.productoDetail.idProduct
        }
        else{
          id = 'p'+$scope.$storage.productComment.id
          $scope.$storage.validarModal = 0
        }
        $location.hash(id);
        var delegateHandle = $ionicScrollDelegate.$getByHandle('content');
        delegateHandle.anchorScroll();
        if(localStorage.platform == 'ios'){
          document.getElementById('pAux'+$scope.$storage.productoDetail.idProduct).style.height = '64px'
        }
      });
      vm.nameProducto = $scope.$storage.productoDetail.nameProducto
      vm.getScrollPosition = function(){
        height = 0
        nProduct = ''
        for(var i=0;i<$scope.$storage.productsList.length;i++){
            if(i == 0){
                id = $scope.$storage.productsList[i].id
                if($ionicScrollDelegate.getScrollPosition().top < document.getElementById('p'+id).offsetHeight){
                    nProduct = $scope.$storage.productsList[i].nombre
                    n = height
                    idProduct = id
                }
            }
            else{
                id = $scope.$storage.productsList[i-1].id
                idAux = $scope.$storage.productsList[i].id
                height = parseInt(height) + parseInt(document.getElementById('p'+id).offsetHeight)
                if($ionicScrollDelegate.$getByHandle('content').getScrollPosition().top >= (height - 15)){
                  nProduct = $scope.$storage.productsList[i].nombre
                  n = height
                  idProduct = idAux
                }
                
                    
            }
        }
        if(nProduct != ''){
          document.getElementById('nameProduct').innerHTML = nProduct
        }
        
      }
      vm.slideChanged = function (index,id){
        if(($ionicSlideBoxDelegate.slidesCount() - 1) == index){
          productDetailService.getProductRelation(id, $scope.$storage.uuid)
          .then(function(res){
            vm.productoRelation['p'+id] = []
            vm.productoRelation['p'+id] = res.data.mensaje;
            console.log(res)
          })
          document.getElementById('nameProduct').innerHTML = 'Productos relacionados'
          document.getElementById('pr'+id).style.left = '0'
          document.getElementById('pr'+id).style.display = 'block'
        }
        else{
           vm.getScrollPosition()
           document.getElementById('pr'+id).style.left = '100%'
           document.getElementById('pr'+id).style.display = 'none'
        }
      }
       /*productDetailService.getProductDetail($scope.$storage.productoDetail.idProduct, $scope.$storage.uuid)
      .then(function(res){
        vm.productoInfo = res.data.mensaje;
        vm.productoInfo.imagenes = img
        $ionicSlideBoxDelegate.update()
        vm.productoInfo.precio = precio
        vm.productoInfo.precioAnt = precioAnt
      })*/
      vm.productoRelation = []
      vm.share = function(product) {
        //data = {};
        $cordovaSocialSharing.share(product.descripcion, product.nombre, urlImage + product.defaultImage, 'http://www.shapp.com.co');
        /*data.name = product.nombre;
        data.link = 'http://www.shapp.com.co';
        data.pic = urlImage + product.defaultImage;
        data.caption = 'visto en Shapp';
        data.desc = product.descripcion;
        FbService.share(data)*/
    }
    vm.validCart = false
    vm.val = '0px'
    vm.cart = function (id){
      if(!$scope.$storage.uuid.invitado){
        if(document.getElementById('cart'+id).style.display == 'block')
          document.getElementById('cart'+id).style.display = 'none'
        else{
          document.getElementById('cart'+id).style.display = 'block'  
        }
      }
      else{
        $state.go('app.invitado');
      }
    }
    if($scope.$storage.productComment){
      productDetailService.userQualify($scope.$storage.uuid,$scope.$storage.productComment.id)
      .then(function(res){
        vm.userQualify = res.data.mensaje
        localStorage.userQualify = res.data.mensaje
      })
    }
    var commentPopup; 
  vm.send = function (){
    valid = 0
    vm.form.calificacion = localStorage.calificacion
    a = document.getElementById('comment')
    vm.form.comment = angular.element(a).val()
    if(localStorage.calificacion > 0 && localStorage.calificacion < 6){
      valid = 1
      productDetailService.calificar($scope.$storage.uuid,$scope.$storage.uuid.uuid.id,$scope.$storage.productComment.id,vm.form.calificacion)
      .then(function(res){
        if(res.data.mensaje.monedas){
          $cordovaToast.showLongBottom('¡Felicidades!, acabas de ganar '+res.data.mensaje.numMonedas+' monedas.')
          $scope.$storage.user.coins = parseInt($scope.$storage.user.coins) + parseInt(res.data.mensaje.numMonedas)
        }
      })
    }
    if(vm.form.comment && vm.form.comment != ''){
      valid = 1
      productDetailService.comentar($scope.$storage.uuid,$scope.$storage.productComment.id,vm.form.comment)
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
      vm.userQualify = 'true'
      localStorage.userQualify = 'true'
      vm.commentAll()
    }
  }
  var commentPopup;

  vm.modalOpen = function (product){
    if(!$scope.$storage.uuid.invitado){
      $scope.$storage.validarModal = 1
      $scope.$storage.productComment = product
      document.getElementsByClassName('backdrop')[0].classList.add('visible')
      document.getElementsByClassName('backdrop')[0].classList.add('active')
      document.getElementsByTagName('body')[0].classList.add('popup-open')
      $scope.commentPopup = $ionicPopup.show({
        templateUrl: 'modules/product/comment.html',
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

  vm.OpenModal = function (product){
    
    $scope.product = product
  
  

    
        $ionicModal.fromTemplateUrl('modules/product/product.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalCart = modal;
            $scope.modalCart.show();
        });
    
    
    }
    
  
  
  $scope.closeModal = function(){
    countModal = $ionicPopup['_popupStack'].length
    $ionicPopup['_popupStack'][countModal - 1].remove()
    $ionicPopup['_popupStack'][countModal - 1].hide()
    document.getElementsByClassName('backdrop')[0].classList.remove('visible')
    document.getElementsByClassName('backdrop')[0].classList.remove('active')
    document.getElementsByTagName('body')[0].classList.remove('popup-open')
  }
  vm.plusCal = function (val){
    vm.form.calificacion = val
    localStorage.calificacion = val
  }
  vm.commentAll = function (){
    $state.go('app.commentProduct');
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
  vm.expand1 = function(pRt){
    $state.go('app.product');
    $scope.display = 'block'
    loading.show($ionicLoading)
    $scope.$storage.productoDetail = {nameProducto:pRt.name,idProduct:pRt.id,indexList:-1};
    if(pRt.categoryId != -1){
      productService.getProducts(pRt.idCatalogo, pRt.idMenu, $scope.$storage.uuid)
      .then(function(res){
        vm.products = res.data.mensaje;
        $scope.$storage.productsList = vm.products;
        id = 'p'+$scope.$storage.productoDetail.idProduct
        $location.hash(id);
        var delegateHandle = $ionicScrollDelegate.$getByHandle('content');
        delegateHandle.anchorScroll();
        if(localStorage.platform == 'ios'){
          document.getElementById('pAux'+$scope.$storage.productoDetail.idProduct).style.height = '64px'
        }
        loading.hide($ionicLoading)
        $scope.display = 'none'
      })
    }
    else{
      brandService.getProductsByCatalogo(pRt.idCatalogo, $scope.$storage.uuid)
      .then(function(res){
        vm.products = res.data.mensaje;
        $scope.$storage.productsList = vm.products;
        id = 'p'+$scope.$storage.productoDetail.idProduct
        $location.hash(id);
        var delegateHandle = $ionicScrollDelegate.$getByHandle('content');
        delegateHandle.anchorScroll();
        if(localStorage.platform == 'ios'){
          document.getElementById('pAux'+$scope.$storage.productoDetail.idProduct).style.height = '64px'
        }
        loading.hide($ionicLoading)
        $scope.display = 'none'
      })
    }
  }

  $scope.showImages = function(img,index) {
    $scope.$storage.zoomImg = img;
    $scope.$storage.activeSlide = index;
    $scope.showModal('modules/zoom/zoom.html');
  };
   
  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.zoomMin = 1;
      $scope.modal = modal;
      $scope.modal.show();
      var element = angular.element(document.getElementById('imgZoom'));
      $ionicGesture.on('pinch', function(e){
        $scope.zoomMin = e.gesture.scale
        console.log($scope.zoomMin)      
      },element,{});
    });
  }

  vm.addCart= function (){
    var posShop = -1
    if(!localStorage.shop)
        localStorage.shop = '[]'
    $scope.shop = JSON.parse(localStorage.shop)
    for (var i = 0; i < $scope.shop.length; i++) {
        if($scope.shop[i].id == $scope.product.id){
            posShop = i
        }
    }
    $scope.product.quantity = $scope.quantity
    if(posShop == -1){
        if($scope.quantity > 0)
            $scope.shop.push($scope.product)
    }
    else{
        if($scope.quantity > 0)
            $scope.shop[posShop].quantity = $scope.quantity
        else
            $scope.shop.splice(posShop,1);
    }
    localStorage.shop = JSON.stringify($scope.shop)
    modalClose()
}

  
  vm.zoomImg = function(img){
    $scope.$storage.zoomImg = img
    $state.go('app.zoom')
  }
  vm.page = function(index,item){
    $ionicSlideBoxDelegate._instances[6+item].slide(index)
    //$ionicSlideBoxDelegate.$getByHandle('pr{{product.id}}').slide(index)
  }
  vm.close = function(){
    $scope.product = {}
    $scope.modalCart.hide();
  }
}
