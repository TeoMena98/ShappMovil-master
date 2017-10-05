angular.module('shapp').factory('userService', userService);

function userService($http, $localStorage, urlService) {
  function get(ruta) {
    return $http.get(urlService + ruta, {cache: false});
  }

  function postJson(ruta, datos) {
    data = datos || {};
    return $http({
      url: urlService + ruta,
      data: data,
      dataType: 'json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  function post(ruta, datos) {
    data = datos || {};
    return $http({
      method: 'POST',
      url: urlService + ruta,
      data: data,
      headers: {
        'Content-Type': 'text/plain'
      }});
  }

  return {
    camposExtra : function(genero, direcc, fechaNac, uuid){
      return postJson('usuarios/updateCamposExtra/',
              { genero : genero, direccion : direcc, fechaNacimiento : fechaNac, uuid : uuid});
    },
    consultarCamposEx : function(uuid){
      return post('usuarios/getCamposExtra/', uuid);
    },
    desactivarUsuario : function(uuid){
      return post('usuarios/disableUser/', uuid);
    },
    cargarIdSuscritos: function(uuid) {
      //if(!$localStorage.catalogosSuscritos) {
        postJson('catalogo/listIdSuscritos/', { uuid : uuid })
        .success(function(res) {
          $localStorage.catalogosSuscritos = res.mensaje;
        });
      //}
      //if(!$localStorage.catalogosSuscritos) {
        postJson('proveedor/listIdSuscritos/', { 'uuid' : uuid })
        .success(function(res) {
          $localStorage.proveedoresSuscritos = res.mensaje;
        });
      //}
    },
    marcasSuscritas: function(id) {
      //return postJson('proveedor/listSuscritos/', { 'uuid' : uuid });
      //return post('proveedor/list/',uuid);
      return post('usuarios/listaMarcas',id);
    },
    catalogosSuscritos: function(uuid) {
      return postJson('catalogo/listSuscritos/', { uuid : uuid });
    },
    catSub: function(uuid, cat) {
      return postJson('catalogo/suscribir/', { 'uuid' : uuid, 'catalogo' : cat});
    },
    catUnsub: function(uuid, cat) {
      return postJson('catalogo/unsub/', { 'uuid' : uuid, 'catalogo' : cat});
    },
    provSub: function(uuid, prov) {
      return postJson('proveedor/suscribir/', { 'uuid' : uuid, 'proveedor' : prov});
    },
    provUnsub: function(uuid, prov) {
      return postJson('proveedor/unsub/', { 'uuid' : uuid, 'proveedor' : prov});
    },
    getMonedas: function(uuid) {
      return post('usuarios/getMonedas', uuid);
    }
  };
};
