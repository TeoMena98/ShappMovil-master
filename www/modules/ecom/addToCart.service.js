(function() {
    'use strict';
    var itemsFilterCache = {};

    function AddToCartSrv($ionicModal, $timeout) {
        var popup = {};
        var $scope = null;
        $ionicModal.fromTemplateUrl('modules/ecom/addToCart.modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modalCart = modal;
        });





        
        function getConfigurations() {
            var configuracionEntity = new APISrv.Entity("Configuracion");
            configuracionEntity.list().then(function(configurations) {
                $localStorage.configurations = configurations;
            }, function(msg) {
                console.log(msg);
            });
        }

        function modalOpen(product) {
            $scope.product = product
            $scope.quantity = 1
            if(!localStorage.shop)
                localStorage.shop = '[]'
            $scope.shop = JSON.parse(localStorage.shop)
            console.log($scope.shop)
            for (var i = 0; i < $scope.shop.length; i++) {
                if($scope.shop[i].id == $scope.product.id){
                    $scope.quantity = $scope.shop[i].quantity
                }
            }
            if(!$scope.modalCart){
                $ionicModal.fromTemplateUrl('modules/ecom/addToCart.modal.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {
                    $scope.modalCart = modal;
                    $scope.modalCart.show();
                });
            }else{
                $scope.modalCart.show();
            }
            
            

        }

    
        
        function addCart(){
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
        function modalClose() {
            $scope.product = {}
            $scope.modalCart.hide();
        }
        function setScope($sc) {
            $scope = $sc;
        }
        function plusCart(){
            $scope.quantity++
        }
        function minusCart(){
            $scope.quantity--
        }

        return {
            getConfigurations: getConfigurations,
            modalOpen: modalOpen,
            modalClose: modalClose,
            setScope: setScope,
            plusCart: plusCart,
            minusCart: minusCart,
            addCart: addCart
           
        };
    }

    angular.module('shapp')
        .factory('AddToCartSrv', AddToCartSrv);
})();
