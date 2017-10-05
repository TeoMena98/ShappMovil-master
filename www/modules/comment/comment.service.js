angular.module('shapp').factory('Comments', Comments);

function Comments($http, urlService) {

 function getComentarios(uuid,brand){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'calificarProveedor/getComentarios/'+brand,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function deleteComentarios(uuid,comment){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'calificarProveedor/deleteComentarios/'+comment,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function getComentariosByFather(uuid,comment,brand){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'calificarProveedor/getComentarios/'+brand+'/'+comment,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function comentarByFather(uuid,idcomment,brand,comment){
    uuid.comentario = comment
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'comentarioProveedores/comentarByPadre/'+brand+'/'+idcomment,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function likedComentario(uuid,comment,liked){
    uuid.liked = liked
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'comentarioProveedores/likedComentario/'+comment,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function calificar(uuid,user,brand,score){
    uuid.score = score
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'calificarProveedor/calificar/'+user+'/'+brand,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function comentar(uuid,brand,comentario){
    uuid.comentario = comentario
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'comentarioProveedores/comentar/'+brand,
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