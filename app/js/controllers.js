var CVApp = angular.module('CVPage', ['ngSanitize']);

CVApp.controller('CVPageCtrl', function ($scope, $http) {
    $http.get('profile/tuan-nguyen.json').success(function(data) {
        $scope.profile = data;
        $scope.firstName = $scope.profile.firstName;
        $scope.lastName = $scope.profile.lastName;
        
        $scope.currentPosition = $scope.profile.currentExperience[0].position;
        $scope.currentCompany = $scope.profile.currentExperience[0].organization;

        $scope.country = $scope.profile.country;
        $scope.industry = $scope.profile.industry;

        $scope.newSummary = $scope.profile.summary;
    });
    
    $scope.isHasValueInArray = function(val) {
        if (val.length > 0)
            return true;
        
        return false;
    }
    
    $scope.SaveNewName = function() {
        $scope.profile.firstName = $scope.firstName;
        $scope.profile.lastName = $scope.lastName;
    }
    
    $scope.SaveCurrentExperience = function() {
        $scope.profile.currentExperience[0].position = $scope.currentPosition;
        $scope.profile.currentExperience[0].organization = $scope.currentCompany;
    }
    
    $scope.SaveNewLocation = function () {
        $scope.profile.country = $scope.country;
        $scope.profile.industry = $scope.industry;
    }

    $scope.SaveNewSummary = function () {
        $scope.profile.summary = $scope.newSummary;
    }

    var dialogOptions = {
        controller: 'CVPageCtrl',
        templateUrl: 'editExperience.html'
    };

    $scope.SaveExperience = function(item){

        var itemToEdit = item;

        $dialog.dialog(angular.extend(dialogOptions, {resolve: {item: angular.copy(itemToEdit)}}))
            .open()
            .then(function(result) {
                if(result) {
                    angular.copy(result, itemToEdit);
                }
                itemToEdit = undefined;
            });
    };
});

// the dialog is injected in the specified controller
function EditExperienceCtrl($scope, item, dialog){
    $scope.item = item;

    $scope.save = function() {
        dialog.close($scope.item);
    };

    $scope.close = function(){
        dialog.close(undefined);
    };
}
