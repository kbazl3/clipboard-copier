angular.module('app')
    .controller("mainCtrl", function($scope, toaster) {
        $scope.supported = false;
        $scope.startFollowUpButton = false

        $scope.clearLocalStorage = function() {
            if (confirm("Are you sure you want to clear local storage?")) {
                localStorage.clear();
                $scope.startFollowUpButton = false;
                location.reload();
            }
        }
        $scope.markAsComplete = function(name) {
            for (var i = 1; i < $scope.followUps.length; i++) {
                console.log($scope.followUps[i].name);
                if (name === $scope.followUps[i].name) {
                    $scope.followUps[i].notes = $scope.followUps[i].notes + " COMPLETED COMPLETED COMPLETED COMPLETED COMPLETED COMPLETED COMPLETED COMPLETED COMPLETED"
                }
            }
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
                $scope.followUps = JSON.parse(localStorage.getItem("session"));
                toaster.pop('success', "Added follow up for " + name, "");
        }

        $scope.followUps = JSON.parse(localStorage.getItem("session"));

        $scope.success = function() {
            toaster.pop('success', "COPIED!!" );
            console.log('Copied!');
        };

        $scope.fail = function(err) {
            toaster.pop('error', err );
            console.error('Error!', err);
        };

    });
