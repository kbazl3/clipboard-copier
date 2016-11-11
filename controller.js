angular.module('app')
    .controller("mainCtrl", function($scope) {

        $scope.supported = false;

        $scope.nameToCopy = "";
        $scope.emailToCopy = ""

        $scope.success = function () {
            console.log('Copied!');
        };

        $scope.fail = function (err) {
            console.error('Error!', err);
        };

    });
