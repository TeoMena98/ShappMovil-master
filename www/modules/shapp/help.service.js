angular.module('shapp').factory('helpService', helpService);

function helpService($http, urlService) {
  function sendEmail(msg, uuid) {
    uuid.contacto = msg
    return $http({
      method: 'POST',
      data: uuid,
      url: urlService + 'contacto/movil/email/',
      headers: {
        'Content-Type': 'application/json'
      }})
  }

  
  return{
    sendEmail:sendEmail
  }
}
