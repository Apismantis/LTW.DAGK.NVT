var CVApp = angular.module('CVPage', ['ngSanitize']);

CVApp.controller('CVPageCtrl', function ($scope, $http) {
    $http.get('profile/tuan-nguyen.json').success(function (data) {
        $scope.profile = data;
        $scope.firstName = $scope.profile.firstName;
        $scope.lastName = $scope.profile.lastName;

        $scope.currentPosition = $scope.profile.currentExperience[0].position;
        $scope.currentCompany = $scope.profile.currentExperience[0].organization;

        $scope.country = $scope.profile.country;
        $scope.industry = $scope.profile.industry;

        $scope.newSummary = $scope.profile.summary;
    });

    $scope.isHasValueInArray = function (val) {
        if (val.length > 0)
            return true;

        return false;
    }

    $scope.SaveNewName = function () {
        $scope.profile.firstName = $scope.firstName;
        $scope.profile.lastName = $scope.lastName;
    }

    $scope.SaveCurrentExperience = function () {
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

    $scope.EditExperienceItem = {};
    $scope.GetCurrentExperience = function ($index) {
        $scope.indexCurrentExp = $index;
        angular.copy($scope.profile.currentExperience[$scope.indexCurrentExp], $scope.EditExperienceItem);
    }

    $scope.SaveExperience = function () {
        angular.copy($scope.EditExperienceItem, $scope.profile.currentExperience[$scope.indexCurrentExp]);
    }

    $scope.EditPreviousExperienceItem = {};
    $scope.GetPreviousExperience = function ($index) {
        $scope.indexPreExp = $index;
        angular.copy($scope.profile.previuosExperience[$scope.indexPreExp], $scope.EditPreviousExperienceItem);
    }

    $scope.SavePreviousExperience = function () {
        angular.copy($scope.EditPreviousExperienceItem, $scope.profile.previuosExperience[$scope.indexPreExp]);
    }

    $scope.EditProjectItem = {};
    $scope.GetProject = function ($index) {
        $scope.indexProject = $index;
        angular.copy($scope.profile.projects[$scope.indexProject], $scope.EditProjectItem);
    }

    $scope.SaveProject = function () {
        angular.copy($scope.EditProjectItem, $scope.profile.projects[$scope.indexProject]);
    }

    $scope.EditTopSkillItem = {};
    $scope.GetTopSkill = function ($index) {
        $scope.indexTopSkill = $index;
        angular.copy($scope.profile.topSkills[$scope.indexTopSkill], $scope.EditTopSkillItem);
        $scope.EditTopSkillItem.rate = 90;
    }

    $scope.SaveTopSkill = function () {
        if ($scope.EditTopSkillItem.rate >= 100)
            $scope.EditTopSkillItem.rate = "99+";
        angular.copy($scope.EditTopSkillItem, $scope.profile.topSkills[$scope.indexTopSkill]);
    }

    $scope.EditOtherSkillItem = {};
    $scope.GetOtherSkill = function ($index) {
        $scope.indexOtherSkill = $index;
        angular.copy($scope.profile.otherSkills[$scope.indexOtherSkill], $scope.EditOtherSkillItem);
        $scope.EditOtherSkillItem.rate = 90;
    }

    $scope.SaveOtherSkill = function () {
        if ($scope.EditOtherSkillItem.rate >= 100)
            $scope.EditOtherSkillItem.rate = "99+";
        angular.copy($scope.EditOtherSkillItem, $scope.profile.otherSkills[$scope.indexOtherSkill]);
    }

    $scope.EdiEducationItem = {};
    $scope.GetEducation = function ($index) {
        $scope.indexEducation = $index;
        angular.copy($scope.profile.education[$scope.indexEducation], $scope.EdiEducationItem);
    }

    $scope.SaveEducation = function () {
        angular.copy($scope.EdiEducationItem, $scope.profile.education[$scope.indexEducation]);
    }
});