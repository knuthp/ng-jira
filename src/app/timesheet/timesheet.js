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

    app.controller('TimesheetController', ['$scope', function ($scope) {

        var init = function() {
        };

        init();
    }]);

}(angular.module("ngJira.timesheet", [
    'ui.router'
])));