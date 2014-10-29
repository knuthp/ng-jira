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
        $scope.groups = [];
        $scope.issuesInPeriod = [];

        var init = function() {
            console.log("TimesheetController");
        };

        init();

        $scope.tableParams = new NgTableParams({
            page: 1,            // show first page
            count: 10           // count per page
        }, {
            total: $scope.issuesInPeriod.length, // length of data
            getData: function($defer, params) {
                $defer.resolve($scope.issuesInPeriod.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });

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
                var group = data.fields.components[0].name;
                $scope.groups[group] = group;
                $scope.issuesInPeriod.push({issue : data, day : "Monday", group : group, timespent : 160, action : "Work"});
            });
            return 0;
        }
    }]);

}(angular.module("ngJira.timesheet", [
    'ui.router'
])));