angular.module('shapp').factory('CommentsProduct', CommentsProduct);

function CommentsProduct($http, urlService) {

 function getComentarios(uuid,product){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'comentarioProductos/getComentarios/'+product,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function deleteComentarios(uuid,comment){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'comentarioProductos/deleteComentarios/'+comment,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function getComentariosByFather(uuid,comment,product){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'comentarioProductos/getComentarios/'+product+'/'+comment,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function comentarByFather(uuid,idcomment,product,comment){
    uuid.comentario = comment
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'comentarioProductos/comentarByPadre/'+product+'/'+idcomment,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function likedComentario(uuid,comment,liked){
    uuid.liked = liked
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'comentarioProductos/likedComentario/'+comment,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function calificar(uuid,user,product,score){
    uuid.score = score
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'calificarProducto/calificar/'+user+'/'+product,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function comentar(uuid,product,comentario){
    uuid.comentario = comentario
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'comentarioProductos/comentar/'+product,
      headers: {
        'Content-Type': 'application/json'
      }})
  }

  return{
  	getComentarios:getComentarios,
    deleteComentarios:deleteComentarios,
    getComentariosByFather:getComentariosByFather,
    comentarByFather:comentarByFather,
    likedComentario:likedComentario,
    calificar:calificar,
    comentar:comentar
  }
};