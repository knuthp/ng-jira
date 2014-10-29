(function(app) {

    app.config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('timesheet', {
            url: '/timesheet',
            views: {
                "main": {
                    controller: 'TimesheetController',
                    templateUrl: 'timesheet/timesheet.tpl.html'
                }
            },
            data:{ pageTitle: 'Timesheet' }
        });
    }]);

    app.controller('TimesheetController', ['$scope', '$http', function ($scope, $http) {
        $scope.issuesInPeriod = [];

        var init = function() {
            console.log("TimesheetController");
        };

        init();


        $http.get("/rest/api/latest/search?jql=updated>=2014-10-29+and+project=JRA")
            .success(function(data) {
                console.log("Total: " + data.total + "l " + data.issues.length);
                for (var i = 0; i < data.issues.length; i++) {
                    var issue = data.issues[i];
                    var x = readIssue(issue);
                }
            });

        function readIssue(issue) {
            $http.get("rest/api/latest/issue/" + issue.key)
                .success(function(data) {
                console.log("Data.key:" + data.key);
                console.log("Project" + data.fields.project.key);
                $scope.issuesInPeriod.push(data);
            });
            return 0;
        }
    }]);

}(angular.module("ngJira.timesheet", [
    'ui.router'
])));