var CVApp = angular.module('CVPage', ['ngSanitize']);

CVApp.controller('CVPageCtrl', function ($scope, $http) {

    $http.get('profile/tuan-nguyen.json').success(function (data) {
        $scope.profile = data;
        $scope.firstName = $scope.profile.firstName;
        $scope.lastName = $scope.profile.lastName;

        $scope.headline = $scope.profile.currentExperience[0].position + " at " + $scope.profile.currentExperience[0].organization;
        $scope.newHeadline = $scope.headline;

        $scope.country = $scope.profile.country;
        $scope.industry = $scope.profile.industry;

        $scope.newSummary = $scope.profile.summary;

        $scope.profile.skills.sort(function (a, b) {
            return parseInt(b.rate) - parseInt(a.rate);
        });

        for (var i = 0; i < $scope.profile.skills.length; i++) {
            if ($scope.profile.skills[i].rate >= 100)
                $scope.profile.skills[i].rate = "99+";
        }
    });

    $scope.isHasValueInArray = function (val) {
        if (val > 0)
            return true;
        return false;
    }

    $scope.IsHasValue = function (val) {
        if (val == null || val == "")
            return false;

        return true;
    }

    $scope.IsEndElementCanShow = function ($index) {
        return $index == 2;
    }

    $scope.IsPreviuosElement = function ($index) {
        return $index < 2;
    }

    $scope.IsNextElement = function ($index) {
        return $index >= 3;
    }

    $scope.SaveNewName = function () {
        $scope.profile.firstName = $scope.firstName;
        $scope.profile.lastName = $scope.lastName;
    }

    $scope.SaveHeadline = function () {
        $scope.headline = $scope.newHeadline;
    }

    $scope.SaveNewLocation = function () {
        $scope.profile.country = $scope.country;
        $scope.profile.industry = $scope.industry;
    }

    $scope.SaveNewSummary = function () {
        $scope.profile.summary = $scope.newSummary;
    }

    $scope.NewExperience = {};
    $scope.SaveNewExperience = function () {
        if ($scope.NewExperience.organization == null || $scope.NewExperience.position == null || $scope.NewExperience.time == null) {
            alert("Lost Information. Please try again.");
        }
        else {
            if ($scope.newURLLogoCompany == null)
                $scope.NewExperience.logo = "img/logo-work-experience.png";

            $scope.Temp = {};
            angular.copy($scope.NewExperience, $scope.Temp);
            $scope.profile.currentExperience.unshift($scope.Temp);
        }
    }

    $scope.NewProject = {};
    $scope.SaveNewProject = function () {
        if ($scope.NewProject.projectName == null || $scope.NewProject.time == null) {
            alert("Lost Information. Please try again.");
        }
        else {
            $scope.Temp = {};
            angular.copy($scope.NewProject, $scope.Temp);
            $scope.profile.projects.unshift($scope.Temp);
        }
    }

    $scope.NewEducation = {};
    $scope.SaveNewEducation = function () {
        if ($scope.NewEducation.schoolName == null || $scope.NewEducation.time == null || $scope.NewEducation.grade == null) {
            alert("Lost Information. Please try again.");
        }
        else {
            if ($scope.NewEducation.log == null)
                $scope.NewEducation.logo = "img/high-school.png";

            $scope.Temp = {};
            angular.copy($scope.NewEducation, $scope.Temp);
            $scope.profile.education.unshift($scope.Temp);
        }
    }

    $scope.IsTopSkill = function ($index) {
        if ($index < 10)
            return true;
        return false;
    }

    $scope.IsOtherSkill = function ($index) {
        if ($index >= 10)
            return true;
        return false;
    }

    $scope.IsHasOtherSkill = function (val) {
        return val > 10;
    }

    $scope.EditExperienceItem = {};
    $scope.GetCurrentExperience = function ($index) {
        $scope.indexCurrentExp = $index;
        angular.copy($scope.profile.currentExperience[$scope.indexCurrentExp], $scope.EditExperienceItem);
    }

    $scope.SaveExperience = function () {
        angular.copy($scope.EditExperienceItem, $scope.profile.currentExperience[$scope.indexCurrentExp]);
    }

    $scope.EditProjectItem = {};
    $scope.GetProject = function ($index) {
        $scope.indexProject = $index;
        angular.copy($scope.profile.projects[$scope.indexProject], $scope.EditProjectItem);
    }

    $scope.SaveProject = function () {
        angular.copy($scope.EditProjectItem, $scope.profile.projects[$scope.indexProject]);
    }

    $scope.NewSkill = {};
    $scope.SaveNewSkill = function () {
        $scope.NewSkill.rate = "0";

        if ($scope.NewSkill.skillName == null) {
            alert("Lost Information. Please try again.");
        }
        else {
            $scope.Temp = {};
            angular.copy($scope.NewSkill, $scope.Temp);
            $scope.profile.skills.unshift($scope.Temp);
            $scope.profile.skills.sort(function (a, b) {
                return parseInt(b.rate) - parseInt(a.rate);
            });
        }
    }

    $scope.EdiEducationItem = {};
    $scope.GetEducation = function ($index) {
        $scope.indexEducation = $index;
        angular.copy($scope.profile.education[$scope.indexEducation], $scope.EdiEducationItem);
    }

    $scope.SaveEducation = function () {
        angular.copy($scope.EdiEducationItem, $scope.profile.education[$scope.indexEducation]);
    }

    $scope.setCurrentIndxObject = function ($index) {
        $scope.indexObject = $index;
    }

    $scope.setCurrentChildIndxObject = function (parentObj, object, $index) {
        $scope.indexObject = $index;
        $scope.indexParentObject = parentObj.indexOf(object);
    }

    $scope.deleteChildObject = function (va) {
        alert("Parent index: " + $scope.indexParentObject + " - Delete index: " + $scope.indexObject);
        if (va[$scope.indexParentObject].recommention != null)
            va[$scope.indexParentObject].recommention.splice($scope.indexObject, 1);

        else if (va[$scope.indexParentObject].teamMember != null)
            va[$scope.indexParentObject].teamMember.splice($scope.indexObject, 1);
    }

    $scope.deleteObject = function (val1) {
        val1.splice($scope.indexObject, 1);
    }
});