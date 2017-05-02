// MODULE
var angularApp = angular.module('angularApp', ['ngMessages', 'ngResource', 'ngRoute']);

angularApp.config(function ($routeProvider) {

    $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainController'
    })
})

// CONTROLLERS
angularApp.controller('mainController', ['$scope', '$q', '$location', '$filter', '$log', '$resource', 'UserPostsServ', 'UserServ',
    function ($scope, $q, $location, $filter, $log, $resource, UserPostsServ, UserServ) {

        $scope.title = "UserPosts"
        $scope.userHash = {};
        $scope.userPostsData = UserPostsServ.query();
        $scope.userData = UserServ.query();


        $q.all([$scope.userPostsData.$promise,
            $scope.userData.$promise

        ]).then(function (data) {

                angular.forEach($scope.userData, function (userRecord, userIndex) {
                    if ($scope.userHash[userRecord.id] === undefined) {
                        $scope.userHash[userRecord.id] = userRecord;

                    }
                });
                angular.forEach($scope.userPostsData, function (userPostRecord, userPostIndex) {
                    if ($scope.userHash[userPostRecord.userId] !== undefined) {
                        $scope.userPostsData[userPostIndex].email = $scope.userHash[userPostRecord.userId].email;
                        $scope.userPostsData[userPostIndex].username = $scope.userHash[userPostRecord.userId].username;

                    } else {
                        $scope.userPostsData[userPostIndex].email = "";
                        $scope.userPostsData[userPostIndex].username = "Unknown";

                    }
                });


            }
        )


    }]);

