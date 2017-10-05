angular.module('shapp').factory('productDetailService', productDetailService);

function productDetailService($http, urlService){

  function getProductDetail(idProducto, uuid){
    return $http({
      url : urlService + 'producto/infoMovil/' + idProducto,
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'text/plain'},
      cache: false
    }); 
  }
  function getProductRelation(idProducto, uuid){
    return $http({
      url : urlService + 'relacionProd/listProductosMovil/' + idProducto,
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    }); 
  }
  function calificar(uuid,user,product,score){
    uuid.score = score
    console.log(uuid)
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
  function userQualify(uuid,product){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'producto/userQualify/'+product,
      headers: {
        'Content-Type': 'application/json'
      }})
  }

  return{
    getProductRelation:getProductRelation,
    getProductDetail:getProductDetail,
    calificar:calificar,
    comentar:comentar,
    userQualify:userQualify
  }
}
