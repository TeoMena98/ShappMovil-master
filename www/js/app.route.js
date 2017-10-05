angular
.module('shapp')
.config(routerConfig);

function routerConfig($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
  $ionicConfigProvider.backButton.text('');
  $stateProvider
  .state('loginHome',{
    url: '/',
    templateUrl: 'modules/login/loginHome.html',
    controller: 'LoginCtrl',
    controllerAs: 'login'
    /*resolve:{
        is: is{
        /*if($sessionStorage.uuid != Null){
          //$state.go('home');
          alert("change state to home");
        }
      }
    }*/
  })
  .state('login',{
    url: '/login',
    templateUrl: 'modules/login/login.html',
    controller: 'LoginCtrl',
    controllerAs: 'Login'
  })

  .state('register',{
    url: '/register',
    templateUrl: 'modules/register/register.html',
    controller: 'RegisterCtrl',
    controllerAs: 'Register'
  })
  .state('forgotPass',{
    url: '/forgotPass',
    templateUrl: 'modules/login/forgotPass.html',
    controller: 'ForgotPassCtrl',
    controllerAs: 'ForgotPass'
  })
  .state('recovery',{
    url: '/recovery',
    templateUrl: 'modules/login/recovery.html',
    controller: 'ForgotPassCtrl',
    controllerAs: 'ForgotPass'
  })
  .state('app.search',{
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'modules/search/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'Search'
      }
    }
  })
  .state('regFB',{
    url: '/regFB',
    templateUrl: 'modules/register/regFB.html',
    controller: 'RegistroFBCtrl'
  })
  .state('app.home', {
    url: '/home',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'modules/home/home.html',
        controller: 'HomeCtrl',
        controllerAs: 'Home'
      }
    }
    
  })
  .state('offline', {
    url: '/offline',
    templateUrl: 'modules/menu/offline.html',
    controller: 'OfflineCtrl'
  })
  .state('app',{
    abstract: true,
    templateUrl: "modules/menu/menu.html",
    controller: 'MenuCtrl',
    controllerAs: 'Menu'
  })
  .state('app.brand', {
    url: '/brand',
    views: {
      'menuContent': {
        templateUrl: 'modules/brand/brand.html',
        controller: 'BrandCtrl',
        controllerAs: 'Brand'
      }
    }
    
  })
  .state('app.invitado', {
    url: '/invitado',
    views: {
      'menuContent': {
        templateUrl: 'modules/invitado/invitado.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      }
    }
    
  })
  .state('app.products', {
    url: '/products',
    views: {
      'menuContent': {
        templateUrl: 'modules/product/products.html',
        controller: 'ProductCtrl',
        controllerAs: 'Products'
      }
    }
    
  })
  .state('app.product', {
    url: '/product',
    views: {
      'menuContent': {
        templateUrl: 'modules/product/product.html',
        controller: 'ProductDetailCtrl',
        controllerAs: 'Product'
      }
    } 
  })
  .state('app.videos', {
    url: '/videos',
    views: {
      'menuContent': {
        templateUrl: 'modules/video/videos.html',
        controller: 'VideoCtrl',
        controllerAs: 'Videos'
      }
    } 
    
  })
  .state('app.zoom', {
    url: '/zoom',
    views: {
      'menuContent': {
        templateUrl: 'modules/zoom/zoom.html',
        controller: 'ZoomCtrl',
        controllerAs: 'Zoom'
      }
    } 
    
  })
  .state('app.notice', {
    url: '/notice',
    views: {
      'menuContent': {
        templateUrl: 'modules/notice/notice.html',
        controller: 'NoticeCtrl',
        controllerAs: 'Notice'
      }
    } 
    
  })
  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'modules/map/map.html',
        controller: 'MapCtrl',
        controllerAs: 'Map'
      }
    }
  })
  .state('app.commentBrand', {
    url: '/commentBrand',
    views: {
      'menuContent': {
        templateUrl: 'modules/comment/comment.html',
        controller: 'CommentCtrl',
        controllerAs: 'Comment'
      }
    }
    
  })
  .state('app.commentProduct', {
    url: '/commentProduct',
    views: {
      'menuContent': {
        templateUrl: 'modules/commentproduct/commentp.html',
        controller: 'CommentProductCtrl',
        controllerAs: 'CommentProduct'
      }
    }
    
  })
  .state('app.challenges', {
    url: '/challenges',
    views: {
      'menuContent': {
        templateUrl: 'modules/gamification/challenges.html',
        controller: 'GamificationCtrl',
        controllerAs: 'Challenges'
      }
    }
    
  })
  .state('app.levels', {
    url: '/levels',
    views: {
      'menuContent': {
        templateUrl: 'modules/level/level.html',
        controller: 'levelsCtrl',
        controllerAs: 'Levels'
      }
    }
    
  })
  .state('app.bonds', {
    url: '/bonds',
    views: {
      'menuContent': {
        templateUrl: 'modules/bonds/bonds.html',
        controller: 'bondsCtrl',
        controllerAs: 'Bonds'
      }
    }
    
  })
  .state('app.bond', {
    url: '/bond',
    views: {
      'menuContent': {
        templateUrl: 'modules/bonds/bond.html',
        controller: 'bondCtrl',
        controllerAs: 'Bond'
      }
    }
    
  })
  .state('app.profile', {
    url: '/profile',
    views: {
      'menuContent': {
        templateUrl: 'modules/profile/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'Profile'
      }
    }
    
  })
  .state('app.myshapp', {
    url: '/myshapp',
    views: {
      'menuContent': {
        templateUrl: 'modules/myshapp/shapp.html',
        controller: 'MyShappCtrl',
        controllerAs: 'MyShapp'
      }
    }
    
  })
  .state('app.trends', {
    url: '/trends',
    views: {
      'menuContent': {
        templateUrl: 'modules/trend/trend.html',
        controller: 'TrendCtrl',
        controllerAs: 'Trends'
      }
    }
    
  })
  .state('app.qshapp', {
    url: '/qshapp',
    views: {
      'menuContent': {
        templateUrl: 'modules/shapp/shapp.html'
      }
    }
  })
  .state('app.guia', {
    url: '/guia',
    views: {
      'menuContent': {
        templateUrl: 'modules/shapp/guia.html'
      }
    }
  })
  .state('app.helpme', {
    url: '/helpme',
    views: {
      'menuContent': {
        templateUrl: 'modules/shapp/help.html',
        controller: 'HelpMeCtrl',
        controllerAs: 'HelpMe'
      }
    }

  })
  .state('app.category', {
    url: '/category',
    views: {
      'menuContent': {
        templateUrl: 'modules/category/category.html',
        controller: 'CategoryCtrl',
        controllerAs: 'Category'
      }
    }
    
  })
  .state('app.BrandByCategory', {
    url: '/BrandByCategory',
    views: {
      'menuContent': {
        templateUrl: 'modules/brandcategory/brandcategory.html',
        controller: 'BrandCategoryCtrl',
        controllerAs: 'BrandCategory'
      }
    }
    
  })
  .state('app.mybonds', {
    url: '/mybonds',
    views: {
      'menuContent': {
        templateUrl: 'modules/mybonds/mybonds.html',
        controller: 'MyBondsCtrl',
        controllerAs: 'MyBonds'
      }
    }
    
  })
  .state('app.new', {
    url: '/new',
    views: {
      'menuContent': {
        templateUrl: 'modules/promNew/new.html',
        controller: 'promNewCtrl',
        controllerAs: 'New'
      }
    }
  })
  .state('app.prom', {
    url: '/prom',
    views: {
      'menuContent': {
        templateUrl: 'modules/promNew/prom.html',
        controller: 'promNewCtrl',
        controllerAs: 'Prom'
      }
    }
  })
  .state('app.cart', {
    url: '/cart',
    views: {
      'menuContent': {
        templateUrl: 'modules/cart/cart.html',
        controller: 'CartCtrl',
        controllerAs: 'Cart'
      }
    }
    
  })

// .state('app.busqueda', {
//   url: '/busqueda',
//   templateUrl: "templates/busqueda/tabs.html",
//   controller: 'BusquedaCtrl'
// })
//
// .state('app.categoria', {
//   url: '/categoria/{id}/{nombre}',
//   templateUrl: 'templates/busqueda/categoriaPorID.html',
//   controller: 'CategoriaIDCtrl'
// })

// .state('app.mapa', {
//   url: '/mapa/{idProv}/{nombre}',
//   templateUrl: 'templates/info/mapaMarca.html',
//   controller: 'MapaMarcaCtrl'
// })
//
// .state('app.videos', {
//   url: '/videos/{idProv}/{nombre}',
//   templateUrl: 'templates/info/videosMarca.html',
//   controller: 'VideosMarcaCtrl'
// })
//
// .state('app.notiPromo', {
//   url: '/notiPromo/{idProv}/{nombre}',
//   templateUrl: 'templates/suscritos/historial.html',
//   controller: 'NotiPromoMarcaCtrl'
// })
//
// .state('app.comentarMarca', {
//   url: '/comentarMarca/{id}',
//   templateUrl: 'templates/info/comentarMarca.html',
//   controller: 'ComMarcaCtrl'
// })
//
// .state('app.comentarProducto', {
//   url: '/comentarProducto/{id}/{nombre}',
//   templateUrl: 'templates/info/comentarProducto.html',
//   controller: 'ComProductoCtrl'
// })
//
// .state('app.retos', {
//   url: '/retos',
//   templateUrl: 'templates/info/retos.html',
//   controller: 'RetosCtrl',
//   cache: false
// })



// .state('app.ajustes', {
//   url: '/ajustes',
//   templateUrl: 'templates/nav/ajustes.html',
//   controller: 'AjustesCtrl',
//   cache: false
// })


//
// .state('app.historial',{
//   url:'/historial',
//   templateUrl: 'templates/suscritos/historial.html',
//   controller: 'HistorialCtrl'
// })
//
// .state('app.categorias',{
//   url: '/categorias/{id}',
//   templateUrl: 'templates/info/categorias.html',
//   controller: 'CategoriasCtrl'
// })

/*function is($state, $sessionStorage){
  if($sessionStorage.uuid != "hola"){
    $state.go('home');
    //alert("is");
  }
}*/

$urlRouterProvider.otherwise('/');
$httpProvider.defaults.useXDomain = true;
delete $httpProvider.defaults.headers.common['X-Requested-With'];
$httpProvider.defaults.headers.common = {};
//$httpProvider.defaults.headers.post = {};
$httpProvider.defaults.headers.put = {};
$httpProvider.defaults.headers.patch = {};

$httpProvider.interceptors.push(function($q, $timeout, $injector) {
  return {
    'response': function(response) {
      var deferred = $q.defer();
      if (response.data && response.data.type == 'WARNING' && response.data.mensaje.indexOf('Sesi&oacute;n') != -1) {
        $timeout(function() {
          //Reescribir con parámetros de nuevos servicios
          /*$injector.get('$mdToast')
          .show($injector.get('$mdToast').simple()
            .content('Sesión expirada, inicie sesión nuevamente'));
          $injector.get('$state').go('login');*/
        });

        deferred.reject(response);
      } else {
        deferred.resolve(response);
      }
      return deferred.promise;
    }
  };
});
}
