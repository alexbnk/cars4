angular.module('publicApp')

    .controller('testCtrl', function($rootScope, $scope, $http, $window, testFactory) {
        $scope.someText = "hello test";

        testFactory.getUsers().then(function(users) {
            $scope.users = users;
        })

        if ($rootScope.isAuthenticated) {
            $scope.btnlbl = 'Log out';
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



    })

    .factory('testFactory', function($http) {
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

    })
