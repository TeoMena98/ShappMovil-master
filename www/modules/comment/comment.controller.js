angular.module('shapp').controller('CommentCtrl', CommentCtrl);

function CommentCtrl($scope, $sessionStorage, $ionicLoading, $state, Comments, urlImage, $ionicModal, $cordovaToast){

  var vm = this;
  $scope.$storage = $sessionStorage;
  vm.urlImage = urlImage;
  vm.logo = $scope.$storage.brand.logo;
  vm.form = []
  vm.form.calificacion = 0
  vm.userQualify = localStorage.userQualify
  $ionicLoading.show({
    template: 'Cargando...'
  });

  ionic.DomUtil.ready(function(){
    $ionicLoading.hide();
  });
  vm.plusCal = function (val){
    vm.form.calificacion = val
  }
  vm.valid = {}
  vm.activedComment = function (id){
    if(!vm.valid[id])
      vm.valid[id] = false
    vm.valid[id] = !vm.valid[id]
  }
  Comments.getComentarios($scope.$storage.uuid,$scope.$storage.brand.marcaId)
  .success(function(res){
    console.log(res)
    if(res.type == 'ERROR')
  	 vm.comment = {};
    else{
      vm.comment = res.mensaje
    }
  })
  vm.sendComment = function(){
    aux = 0
    if(vm.form.calificacion > 0 && vm.form.calificacion < 6){
      aux = 1
      Comments.calificar($scope.$storage.uuid,$scope.$storage.uuid.uuid.id,$scope.$storage.brand.marcaId,vm.form.calificacion)
      .then(function(res){
        vm.userQualify = 'true'
        if(res.data.mensaje.monedas){
          $cordovaToast.showLongBottom('¡Felicidades!, acabas de ganar '+res.data.mensaje.cantidad+' monedas.')
          $scope.$storage.user.coins = parseInt($scope.$storage.user.coins) + parseInt(res.data.mensaje.cantidad)
        }
      })
    }
    if(vm.form.comment && vm.form.comment != ''){
      aux = 1
      Comments.comentar($scope.$storage.uuid,$scope.$storage.brand.marcaId,vm.form.comment)
      .then(function(res){
        Comments.getComentarios($scope.$storage.uuid,$scope.$storage.brand.marcaId)
        .success(function(resp){
          if(resp.type == 'ERROR')
           vm.comment = {};
          else{
            vm.comment = resp.mensaje
            vm.form.comment = ''
          }
        })
       if(res.data.mensaje.monedas){
          $cordovaToast.showLongBottom('¡Felicidades!, acabas de ganar '+res.data.mensaje.cantidad+' monedas.')
          $scope.$storage.user.coins = parseInt($scope.$storage.user.coins) + parseInt(res.data.mensaje.cantidad)
        }
      })
    }
    if(aux == 0){
      $cordovaToast.showLongBottom('Ups, aun te falta colocar una calificación o un comentario');
      e.preventDefault();
    }
  }
  $ionicModal.fromTemplateUrl('modules/comment/more.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.more = modal;
  });
  vm.openModal = function(data) {
    $scope.$storage.data = data
    vm.getCommentByFather(data.id,2)
    $scope.more.show();
  };
  vm.closeModal = function() {
    $scope.more.hide();
  };
  vm.deleteComment = function (idcomment){
    $ionicLoading.show({
      template: 'Cargando...'
    });
    Comments.deleteComentarios($scope.$storage.uuid,idcomment)
    .success(function(res){
      var index = -1
      for (var i = 0; i < vm.comment.length; i++) {
        if(vm.comment[i].id == idcomment){
          vm.comment.splice(i,1);
        }
      }
      $ionicLoading.hide();
    })
  }
  vm.likedComment = function (idcomment,liked){
    liked = !liked
    Comments.likedComentario($scope.$storage.uuid,idcomment,liked)
    .success(function(res){
      Comments.getComentarios($scope.$storage.uuid,$scope.$storage.brand.marcaId)
      .success(function(res){
        if(res.type == 'ERROR')
         vm.comment = {};
        else{
          vm.comment = res.mensaje
        }
      })
    })
  }
  vm.commentByFather = function (idcomment,type){
    Comments.comentarByFather($scope.$storage.uuid,idcomment,$scope.$storage.brand.marcaId,vm.form.commentFather[idcomment])
    .success(function(res){
      vm.form.commentFather[idcomment] = ''
      vm.getCommentByFather(idcomment,type)
      if(type != 2)
        vm.activedComment(idcomment)
    })
  }
  vm.child = {}
  vm.getCommentByFather = function (idcomment,type){
    Comments.getComentariosByFather($scope.$storage.uuid,idcomment,$scope.$storage.brand.marcaId)
    .success(function(res){
      if(res.mensaje != 'vacio'){
        if(type==2){
          vm.childModal = res.mensaje
        }
        else{
          vm.child[idcomment] = res.mensaje
        }
      }
      else{
        if(type==2)
          vm.childModal = {}
        else
          vm.child[idcomment] = {}
      }
    })
  }
} 