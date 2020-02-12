import * as cookie from 'react-cookies';
import * as jwt from 'jsonwebtoken';
import axios from 'axios';

export const doAuthentication = (username, password) => {

  const url = "http://"+window.location.hostname+":9094/authorization/login/";

  return axios.post( url, { username: username, password: password }, { crossDomain: true } ).then(res => { // then print response status

      if(res && res.data && res.status === 202) {

        const jwtDecoded = jwt.decode(res.data, { complete: true, json: true } );

        const expireDate = new Date(jwtDecoded.payload.expirationDate);

        const user_login = jwtDecoded.payload;
        
        user_login.jwt = res.data

        cookie.save( 'user_login', user_login, { path: '/' , expires: expireDate } );

        return  { forward_permission: "authorized", user_login: jwtDecoded.payload.user };
        
      }  else {

        cookie.remove('user_login');

        return  { forward_permission: "error" };

      }

  }).catch(error => {
    
    cookie.remove('user_login');

    if (error.response && error.response.status === 401) {

      return  { forward_permission: "unauthorized" };

    } else {

      return  { forward_permission: "error" };

    }

  });

}

export const isAuthenticated = (rest) => {

  const user_login = cookie.load('user_login');

  if(user_login && user_login.user && rest.role === user_login.user.profile && (user_login.expirationDate > Date.now())) {
    //o usuário é válido E está o cookie está na validade E o perfil tem acesso à url requisitada
      return true;
  } else {
      cookie.remove('user_login');
      return false;
  }

}

export const registerUser = (user) => {

  const url = "http://"+window.location.hostname+":9094/authorization/register/";

  const user_login = cookie.load('user_login');

  return axios.post( url, user, { crossDomain: true, headers: { 'token': user_login.jwt } } )
    .then(res => { 

      return {
        data: res.data, 
        status: res.status, 
        statusText: res.statusText };

    })
    .catch(error => {

      return  {
        data: error.response.data, 
        error: error
      };

    });

}
