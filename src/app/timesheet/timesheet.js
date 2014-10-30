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

    app.controller('TimesheetController', ['$scope', '$http', '$filter', 'ngTableParams', function ($scope, $http, $filter, NgTableParams) {
        $scope.groups = {unknown : "unknown"};
        $scope.issuesInPeriod = [];

        var init = function() {
            console.log("TimesheetController");
        };

        init();


        $http.get("/rest/api/latest/search?jql=updated>=2014-10-30+and+project=JRA")
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
                console.log("Comments.length: " + data.fields.comment.comments.length);

                var group;
                if (data.fields.components.length === 0) {
                    group = "";
                } else {
                    group = data.fields.components[0].name;
                    $scope.groups[group] = group;
                }
                console.log($scope.groups);
                $scope.issuesInPeriod.push({issue : data, day : "Monday", group : group, timespent : 160, action : "Comment"});
            });
            return 0;
        }
    }]);

}(angular.module("ngJira.timesheet", [
    'ui.router'
])));