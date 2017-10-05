angular.module('shapp').factory('Profile', Profile);

function Profile($http, urlService) {

  function departamentos(uuid){
    return $http({
      url : urlService + 'almacen/departamentos',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }
  function ciudades(uuid,idDep){
    return $http({
      url : urlService + 'almacen/ciudades/'+idDep,
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }
  function updatePerfil(uuid, data){
    uuid.nombre = data.name
    uuid.celular = data.cel
    uuid.correo = data.email
    uuid.pass = data.pass1
    uuid.genero = data.gen
    uuid.ciudad = data.city
    uuid.direccion = data.dir
    uuid.fechaNacimiento = data.date
    return $http({
      url : urlService + 'usuarios/updateCamposExtra',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }
  function takePerfil(uuid){
    return $http({
      url : urlService + 'usuarios/takeCamposExtra',
      method : "POST",
      data: uuid,
      headers: {'Content-Type': 'application/json'},
      cache: false
    });
  }

  return{
    departamentos:departamentos,
    ciudades:ciudades,
    updatePerfil:updatePerfil,
    takePerfil:takePerfil
  }
};
