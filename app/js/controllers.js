var CVApp = angular.module('CVPage', ['ngSanitize']);

CVApp.controller('CVPageCtrl', function ($scope, $http) {
    $http.get('profile/tuan-nguyen.json').success(function(data) {
        $scope.profile = data;
    });
    
    $scope.isHasValueInArray = function(val) {
        if (val.length > 0)
            return true;
        
        return false;
    }
});
