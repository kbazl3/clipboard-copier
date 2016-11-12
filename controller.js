angular.module('app')
    .controller("mainCtrl", function($scope) {
        $scope.supported = false;
        $scope.startFollowUpButton = false

        $scope.clearLocalStorage = function() {
            localStorage.clear();
            $scope.startFollowUpButton = false;
            location.reload();
        }

        $scope.followUpInputContainer = true;
        if (localStorage.getItem('session')) {
            $scope.followUpInputContainer = false;
            $scope.startFollowUpButton = true;
        }
        $scope.startFollowUps = function() {
            var a = [];
            a.push(JSON.parse(localStorage.getItem('session')));
            localStorage.setItem('session', JSON.stringify(a));
            $scope.followUpInputContainer = false;
            $scope.startFollowUpButton = true;
        }
        $scope.addToFollowups = function(name, email, notes) {
                var followUp = {
                    name: name,
                    email: email,
                    notes: notes
                }
                var a = [];
                // Parse the serialized data back into an aray of objects
                a = JSON.parse(localStorage.getItem('session'));
                // Push the new data (whether it be an object or anything else) onto the array
                a.push(followUp);
                // Re-serialize the array back into a string and store it in localStorage
                localStorage.setItem('session', JSON.stringify(a));
                $scope.nameToCopy1 = "";
                $scope.emailToCopy1 = "";
                $scope.notesToCopy1 = "";
                location.reload();
        }

        $scope.followUps = JSON.parse(localStorage.getItem("session"));

        $scope.success = function() {
            console.log('Copied!');
        };

        $scope.fail = function(err) {
            console.error('Error!', err);
        };

    });
