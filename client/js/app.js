angular
  .module('FightBall', ['ui.router', 'mainController', 'SocketController', 'authService', 'chatSocket', 'btford.socket-io'])
  .value('nickName', 'anonymous')
  .config(MainRouter)

  .constant('ApiEndpoint', {
    url: 'http://localhost:8080/api/authenticate'
  })

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){
    // $locationProvider.html5Mode(false).hashPrefix('!')

    $stateProvider
    .state('index', {
      url: '/',
      templateUrl: 'index.html'
    })
    .state('home',{
      url: '/home',
      templateUrl: 'home.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'login.html'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup.html'
    })

  }
