angular
  .module('mainController', [])

  .controller('mainController', function($rootScope, $location, Auth){

    var vm = this;

    // get info if person is logged in
    vm.loggedIn = Auth.isLoggedIn();

    //check to see if a user is logged in on every request
    $rootScope.$on('$routeChangeStart', function(){
      vm.loggedIn = Auth.isLoggedIn();

      //get user info on route change
      Auth.getUser()
        .success(function(data){
          vm.user = data;
        });
    });

    //function to handle login form
    vm.doLogin = function(){
      Auth.login(vm.loginData.username, vm.loginData.password)
        .success(function(data){
          //if a user successfully logs in, redirect to homepage
          $location.path('/');
        });
    };

    vm.doLogout = function(){
      Auth.logout();
      //reset all user info
      vm.user = {};
      $location.path('/')
    }

  });
