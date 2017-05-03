angular.module('app')
    .controller("mainCtrl", function($scope, toaster) {
        $scope.supported = false; //this has something to do with the clipboar copier
        $scope.startFollowUpButton = false //This is the button that initiates 'session' in local storage
        $scope.followUpInputContainer = true; // this input container is hidden until the startFollowUpButton is clicked
        $scope.emailTemplate = "This is a follow-up to our call earlier. We wanted to make sure all of your needs were taken care of and all of your concerns were addressed. You called Canvas Support today because you were xxxxxxxxxx. To resolve the issue we xxxxxxxxxx.   If you have any additional questions, please give us a call or email us at support@instructure.com. We appreciate your role in making Canvas awesome. :)"
        $scope.followUps = JSON.parse(localStorage.getItem("session"));
        $scope.colorz = "blue";
        // arrayOfCompletedFollowups = [],
        // arrayOfNonCompletedFollowups = [];
        if (localStorage.getItem('session')) {
            $scope.followUpInputContainer = false;
            $scope.startFollowUpButton = true;
        }

        $scope.markAsComplete = function(name) {
            var a = [];
            a = JSON.parse(localStorage.getItem('session'));
            for (var i = 1; i < a.length; i++) {
                if (a[i].name === name) {
                    a[i].completed = true;
                    a[i].color = "#FF9999";
                    a.splice(i, 1, a[i]);
                    localStorage.setItem('session', JSON.stringify(a));
                    //completedFollowUps();
                    location.reload();
                }
            }
        }

        var completedFollowUps = function() {
            for (var i = 1; i < followUps.length; i++) {
                if (followUps[i].completed === true) {
                    arrayOfCompletedFollowups.push(followUps[i]);
                } else {
                    arrayOfNonCompletedFollowups.push(followUps[i]);
                }
            }
        }

        $scope.startFollowUps = function() {
            var a = [];
            a.push(JSON.parse(localStorage.getItem('session')));
            localStorage.setItem('session', JSON.stringify(a));
            $scope.followUpInputContainer = false;
            $scope.startFollowUpButton = true;
        }

        $scope.addToFollowups = function(name, email, accountURL, emailTemplate, notes) {
            if (name.indexOf(" ") !== -1) {
                var space = name.indexOf(" ");
            }
            name = name[0].toUpperCase() + name.slice(1, space + 1).toLowerCase() + name[space + 1].toUpperCase() + name.slice(space + 2, name.length).toLowerCase();
            var followUp = {
                name: name,
                email: email,
                accountURL: "Account URL: " + accountURL,
                emailTemplate: emailTemplate,
                notes: notes,
                completed: false,
                time: Date.now(),
                color: null
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
            $scope.emailTemplate = "This is a follow-up to our call earlier. We wanted to make sure all of your needs were taken care of and all of your concerns were addressed. You called Canvas Support today because you were xxxxxxxxxx. To resolve the issue we xxxxxxxxxx.   If you have any additional questions, please give us a call or email us at support@instructure.com. We appreciate your role in making Canvas awesome. :)"
            $scope.followUps = JSON.parse(localStorage.getItem("session"));
            $scope.accountURL = "";
            //completedFollowUps();
            $scope.numberOfFollowUps = $scope.followUps.length;
            toaster.pop('success', "Added follow up for " + name, "");
        }


        $scope.updateFollowUp = function(updatedName, updatedEmail, updatedNotes) {
            var a = [];
            a = JSON.parse(localStorage.getItem('session'));
            for (var i = 1; i < a.length; i++) {
                if (a[i].email === updatedEmail) {
                    a[i].name = updatedName;
                    a[i].notes = updatedNotes;
                    a.splice(i, 1, a[i]);
                    localStorage.setItem('session', JSON.stringify(a));
                    break;
                }
            }
        }

        $scope.clearLocalStorage = function() {
            if (confirm("Are you sure you want to clear local storage?  This will permanently delete all of your follow ups.")) {
                localStorage.clear();
                $scope.startFollowUpButton = false;
                location.reload();
            }
        }


        // $scope.completedFollowUps = arrayOfCompletedFollowups;
        // $scope.nonCompletedFollowUps = arrayOfNonCompletedFollowups
        // console.log(arrayOfNonCompletedFollowups, arrayOfCompletedFollowups)




        $scope.success = function() {
            toaster.pop('success', "COPIED!!");
            console.log('Copied!');
        };


        // Ideas for Follow ups!! ****************
        //HOSTING THIS WOULD REQUIRE STRICT SECURITY/AUTHORIZATION DUE TO FERPA LAWS
        //seperate completed from non completed
        //allow hyperlinks within the text field -- I'm going out on a limb and saying this can't be done using Local Storage
        //detect if there is more then 1 space in name.  capitalize every letter after space
        //create timer that lets you know if your case is going to expire and get thrown into the l1 queue
        //search for keywords in notes/emailtemplate for CCA?
        //create field for the URL the case was about
        //have it check their user accountURL or email for what school they go to.  What if it's vanity?
        //throw it on a node server!
        //*********

        //*****QA Tests



        //********* Done
        // have notes AND macro-type paragraph
        //be able to mark follow up as completed
        //Add a counter that shows "X amount of follows to do"
        //make name fields capitalize first letter!
        //be able to edit a follow up and update it in Local storage
        //add timestamp
        //create field for user account URL
        //have timestamp show in standard time (not military)
        //*********



        $scope.fail = function(err) {
            toaster.pop('error', err);
            console.error('Error!', err);
        };

    });
