angular.module('shapp').directive('addToCart', ['$timeout', 'AddToCartSrv', 'urlImage', function($timeout, AddToCartSrv, urlImage) {
    function link($scope, el, attrs) {
        // el.replaceWith(el.children());
        $scope.urlImage = urlImage;
        /*$scope.product = attrs.product || {};
        $scope.product = {
            "id": 13,
            "idCatalogo": -1,
            "idMenu": -1,
            "nombre": "Zapaticos!",
            "descripcion": "",
            "precio": 0,
            "activo": true,
            "referencia": "001",
            "defaultImage": "images/productos/6-producto10121434752770016.jpg",
            "cantImages": 1,
            "imagenes": [],
            "promedioCalificacion": {
                "cantidad": 1,
                "suma": 5,
                "promedio": 5,
                "calificacionesPorDia": 0,
                "monedas": false
            },
            "haveRelations": false
        };*/
        AddToCartSrv.setScope($scope);
        $scope.addToCart = AddToCartSrv.modalOpen;
        $scope.close = AddToCartSrv.modalClose;
        $scope.minusCart = AddToCartSrv.minusCart
        $scope.plusCart = AddToCartSrv.plusCart
        $scope.addCart = AddToCartSrv.addCart
      
    }
    return {
        link: link,
        template: '<button class="button button-icon button-clear ion-ios-cart" ng-click="addToCart(product)"></button>',
        // templateUrl: 'components/ecom/addToCart.directive.html',
        restrict: 'E',
        $scope: {
            product: "="
        }
       
};
}]);
