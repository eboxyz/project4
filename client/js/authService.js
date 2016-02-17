angular
  .module('authService',[])

  //auth factory to login+get info
  //inject $http for communication with API
  //inject $q to return promise objects
  // injecdt AuthToken to manage tokens
  .factory('Auth', function($http, $q, AuthToken){

    //create auth factory object
    var authFactory = {};

    //log a user in
    authFactory.login = function(username, password){
      //return the promise object and its data
      return $http.post('/api/authenticate', {
        username: username,
        password: password
      })
        .success(function(data){
          AuthToken.setToken(data.token);
          return data;
        })
    };

    //log user out by clearing token
    authFactory.logout = function(){
      //clear token
      AuthToken.setToken();
    };

    //checks if a user is logged in
    //checks if there is a local token
    authFactory.isLoggedIn = function(){
      if(AuthToken.getToken())
        return true;
      else
        return false;
    };

    authFactory.getUser = function(){
      if (AuthToken.getToken())
        return $http.get('/api/me');
      else
        return $q.reject({message: 'User has no token'});
    };

    return authFactory;
  })

  //factory for handling tokens
  //inject $window to store token client side
  .factory('AuthToken', function($window){
    var authTokenFactory = {};

    //get token out of localStorage
    authTokenFactory.getToken = function(){
      return $window.localStorage.getItem('token');
    };
    //function to set token or clear token
    //if token is passed, set the token
    //if there is no token, clear it from localstorage
    authTokenFactory.setToken = function(token){
      if(token)
        $window.localStorage.setItem('token', token);
      else
        $window.localStorage.removeItem('token');
    };
    return authTokenFactory;
  })

  .factory('AuthInterceptor', function($q, AuthToken){
    var interceptorFactory = {};
    //attach the token to every request
    //redirect if a token doesn't authenticate

    //this happens on all HTTP requests
    interceptorFactory.request = function(config){
      //grab the token
      var token = AuthToken.getToken();
      //if token exists add it to the header as an
      //x-access-token
      if(token)
        config.headers['x-access-token'] = token;

      return config
    };

    interceptorFactory.responseError = function(response){
      //if server returns 403 forbidden
      if (response.status == 403){
        AuthToken.setToken();
        $location.path('/login');
      }
      return $q.reject(response);
    }
    return interceptorFactory;
  })
