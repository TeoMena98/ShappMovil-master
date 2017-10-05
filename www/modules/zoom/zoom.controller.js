angular.module('shapp').controller('ZoomCtrl', ZoomCtrl);

function ZoomCtrl($ionicGesture, $ionicScrollDelegate, $ionicLoading, $sessionStorage, $cordovaToast, $scope, $ionicModal, $state, urlImage, $timeout, $ionicHistory){

  	var vm = this;
  	$scope.$storage = $sessionStorage;
  	vm.urlImage = urlImage;

  	$scope.activeSlide = $scope.$storage.activeSlide
	 
	$scope.closeModal = function() {
	  $scope.modal.hide();
	  $scope.modal.remove()
	};
	 
	

	/*$scope.zoom = 1
	var element = angular.element(document.getElementById('imgZoom'));
	$ionicGesture.on('pinch', function(e){
        $scope.zoom = e.gesture.scale;  
        console.log($scope.zoom)      
    },element,{});*/

    var scale = 1,
    gestureArea = document.getElementById('gesture-area'),
    scaleElement = document.getElementById('scale-element'),
    resetTimeout;

	interact(gestureArea)
	  .gesturable({
	    onstart: function (event) {
	      clearTimeout(resetTimeout);
	      scaleElement.classList.remove('reset');
	    },
	    onmove: function (event) {
	      scale = scale * (1 + event.ds);

	      scaleElement.style.webkitTransform =
	      scaleElement.style.transform =
	        'scale(' + scale + ')';

	      dragMoveListener(event);
	    },
	    onend: function (event) {
	      resetTimeout = setTimeout(reset, 10000);
	      scaleElement.classList.add('reset');
	    }
	  })
	  .draggable({ onmove: dragMoveListener });

	function reset () {
	  scale = 1;
	  scaleElement.style.webkitTransform =
	  scaleElement.style.transform =
	    'scale(1)';
	}

	function dragMoveListener (event) {
	    var target = event.target,
	        // keep the dragged position in the data-x/data-y attributes
	        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
	        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

	    // translate the element
	    target.style.webkitTransform =
	    target.style.transform =
	      'translate(' + x + 'px, ' + y + 'px)';

	    // update the posiion attributes
	    target.setAttribute('data-x', x);
	    target.setAttribute('data-y', y);
	}
};
