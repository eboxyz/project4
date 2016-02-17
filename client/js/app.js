angular
  .module('FightBall', ['ui.router', 'mainController', 'authService'])
  .config(MainRouter)

  function MainRouter($stateProvider, $urlRouterProvider, $locationProvider){
    $locationProvider.html5Mode(true).hashPrefix('!')

    $stateProvider
    .state('home',{
      url: '/',
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
ml5
