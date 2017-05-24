angular.module('cars4', ['ui.router'])
    .controller('authCtrl', ['$scope', '$state', function($scope, $state, $http) {




    }])

    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {


        $urlRouterProvider.otherwise('/welcome');

        $locationProvider.html5Mode(true);
        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'welcome.html',
                controller: 'authCtrl'
            })
            .state('welcome.register', {
                url: '/register',
                templateUrl: 'register.html',
                controller: 'authCtrl'
            })
            .state('welcome.login', {
                url: '/login',
                templateUrl: 'login.html',
                controller: 'authCtrl'
            })
            .state('app', {
                url: '/app',
                templateUrl: 'app.html',
                resolve: {
                    // user: function(authService) {
                    //     return authService.getUserDetails();
                    //}
                }
            })
            .state('auth', {
                url: '/authorization?token&name&oid&photo',
                controller: function($rootScope, $stateParams, $state, $http) {
                    console.log($stateParams);
                    var user = {
                        name: $stateParams.name,
                        token: $stateParams.token,
                        oid: $stateParams.oid,
                        photo: $stateParams.photoURI

                    };
                    // Save user info in localStorage:
                    localStorage.setItem("user", JSON.stringify(user));


                    //set the header for all requests
                    $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;





                    //Set rootScope variables:
                    $rootScope.currentUser = user.name;
                    $rootScope.oid = user.oid;
                    $rootScope.homeLink = "/";
                    $rootScope.isAuthenticated = true;
                    $rootScope.photoURI = 'http://graph.facebook.com/'+user.oid+'/picture';
                    $rootScope.token = user.token;
                    $state.go('app');
                    //$window.location.href = '/app';

                }
            });
    })


    // alex this code will check for user in localStorage, if exists it redirects to the private section

    .run(function($rootScope, $http) {
        var user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            $rootScope.currentUser = user.name;
            $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
            $rootScope.token = user.token;
            $rootScope.isAuthenticated = true;
            $rootScope.photoURI = 'http://graph.facebook.com/'+user.oid+'/picture';
            $rootScope.oid = user.oid;
            //$window.location.href = '/app'; //disabled because creates loop
        }
    })
