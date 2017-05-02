(function () {
    'use strict';
    angular.module('angularApp')

        .factory('UserPostsServ', function ($resource) {
            return $resource("https://jsonplaceholder.typicode.com/posts", {}, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            });
        })
        .factory('UserServ', function ($resource) {
            return $resource("https://jsonplaceholder.typicode.com/users", {}, {
                query: {
                    method: 'GET',
                    isArray: true
                }
            });
        })
})();
