var CVApp = angular.module('CVPage', ['ngSanitize']);

CVApp.controller('CVPageCtrl', function ($scope, $http) {
    $http.get('profile/profile.json').success(function(data) {
        $scope.profile = data;
    });
    
});
