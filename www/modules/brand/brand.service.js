angular.module('shapp').factory('brandService', brandService);

function brandService($http, urlService) {
  function getCatalogs(id, uuid) {
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'catalogo/movil/listCatalogos/' + id,
      headers: {
        'Content-Type': 'application/json'
      }})
  }

  function getProductsByCatalogo(id, uuid) {
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'producto/movil/listProductsByCatalogo/' + id,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function getCatalog(id, uuid) {
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'menu/movil/list/' + id,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function getProductsCatalog(idCatalog, uuid) {
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'producto/movil/listProductsByCatalogId/'+ idCatalog,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function getProductsByCat(idCatalog, idCategory, uuid){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'producto/movil/listProducts/'+ idCatalog+'/'+idCategory,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function getSubCat(idCategory, uuid){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'menu/movil/listCategoriaByFather/'+idCategory,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function getPromos(idMarca,uuid){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'Bonos/getBonos/'+idMarca,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function isFollowing(idMarca, uuid){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'marca/visitMarca/' + idMarca,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function setFollow(idMarca, uuid, changeTo){
    uuid.uuid.follow = changeTo;
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'proveedor/followMarcas/'+ uuid.uuid.id + "/"+ idMarca,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function reportShare(idMarca, uuid){
    alert(isMarca);
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'retos/movil/shareMarca/' +uuid.uuid.id+'/'+ idMarca,
      //url: urlService + 'retos/movil/shareProduct/' +uuid.uuid.id+'/1' ,
      headers: {
        'Content-Type': 'application/json'
      }})
  }

  function getShapps(uuid){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'proveedor/listShapps/'+ uuid.uuid.id,
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
  function reciente(uuid){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'marca/marcasRecientes',
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function validVideo(uuid,idMarca){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'videos/marcaHasVideos/'+idMarca,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function validNotice(uuid,idMarca){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'novedades/marcaHasNovedades/'+idMarca,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  function validMaps(uuid,idMarca){
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'almacen/marcaHasAlmacenes/'+idMarca,
      headers: {
        'Content-Type': 'application/json'
      }})
  }
  return{
    getCatalogs:getCatalogs,
    getPromos:getPromos,
    getCatalog:getCatalog,
    getProductsCatalog:getProductsCatalog,
    getSubCat:getSubCat,
    getProductsByCat:getProductsByCat,
    setFollow:setFollow,
    isFollowing:isFollowing,
    reportShare:reportShare,
    getShapps:getShapps,
    calificar:calificar,
    comentar:comentar,
    reciente:reciente,
    getProductsByCatalogo:getProductsByCatalogo,
    validVideo:validVideo,
    validNotice:validNotice,
    validMaps:validMaps
  }
}
