angular.module('cars4', ['ui.router'])
    .controller('authCtrl', ['$scope', '$state', function($scope, $state, $http) {




    }])

    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider, $locationProvider) {


        $urlRouterProvider.otherwise('/welcome');

        $locationProvider.html5Mode(true);
        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: './templates/welcome.html',
                controller: 'authCtrl'
            })
            
            .state('welcome.register', {
                url: '/register',
                templateUrl: './templates/register.html',
                controller: 'authCtrl'
            })
            .state('welcome.login', {
                url: '/login',
                templateUrl: './templates/login.html',
                controller: 'authCtrl'
            })
            .state('app', {
                url: '/app',
                templateUrl: './templates/signin.html',
                resolve: {
                    // user: function(authService) {
                    //     return authService.getUserDetails();
                    //}
                }
            })
            .state('auth', {
                url: '/authorization?token&name&oid&photo',
                controller: ["$rootScope", "$stateParams", "$state", "$http", function($rootScope, $stateParams, $state, $http) {
                    console.log($stateParams);
                    var user = {
                        name: $stateParams.name,
                        token: $stateParams.token,
                        oid: $stateParams.oid,
                        //photo: $stateParams.photoURI

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

                }]
            });
    }])


    // alex this code will check for user in localStorage, if exists it redirects to the private section

    .run(["$rootScope", "$http", function($rootScope, $http) {
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
    }])

angular.module('cars4')

    .controller('testCtrl', ["$rootScope", "$scope", "$http", "$window", "testFactory", function($rootScope, $scope, $http, $window, testFactory) {
        $scope.someText = "hello test";

        testFactory.getUsers().then(function(users) {
            $scope.users = users;
        })

        if ($rootScope.isAuthenticated) {
            $scope.btnlbl = 'Log out ';
        } else {
            $scope.btnlbl = 'Log in'
        }

        $scope.changestate = function() {

            if ($rootScope.isAuthenticated) {
                delete $http.defaults.headers.common.Authorization;
                $rootScope.isAuthenticated = false;
                $window.location.reload();
                localStorage.removeItem("user");
            } else {
                //$window.location.href = "/auth/facebook";
                  $http.get('/facebook').then(function(){})

            }


        }
        testFactory.getPhoto($rootScope.oid).then(function(photo) {
            $scope.userProfilePhoto = photo;
        })



    }])

    .factory('testFactory', ["$http", function($http) {
        var thisFactory = {};

        var user = JSON.parse(localStorage.getItem("user"));


        //set the header for all requests
        //$http.defaults.headers.common.Authorization = 'Bearer ' + user.token;


        thisFactory.getUsers = function() {

            return $http.get('/api/users')
                .then(function(response) {
                    // console.log(response.data);
                    //play with data
                    //console.log(response.data);
                    return response.data;

                }, function(err) {
                    //console.error(err);
                });


        };

        thisFactory.getPhoto = function(facebookId) {

            return $http.get('http://graph.facebook.com/' + facebookId + '/picture')
                .then(function(response) {
                    // console.log(response.data);
                    //play with data
                    //console.log(response.data);
                    return response.data;

                }, function(err) {
                    //console.error(err);
                });


        };









        return thisFactory;

    }])
