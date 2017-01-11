// angular app
var app = angular.module('careerCompass', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('profile', {
            url: '/profile',
            templateUrl: '/templates/profile.html',
            controller: 'profileCtrl',
            controllerAs: '$ctrl'
        });
    $stateProvider
        .state('results', {
            url: '/results',
            templateUrl: '/templates/results.html',
            controller: 'resultsCtrl',
            controllerAs: '$ctrl'
        });
    // TEST FOR SEARCHING
    $stateProvider
        .state('test', {
            url: '/test',
            templateUrl: '/templates/test.html',
            controller: 'testCtrl',
            controllerAs: '$ctrl'
        });
    $urlRouterProvider.otherwise('/profile');
});


app.controller('testCtrl', function($http) {
    var vm = this;
    vm.allJobs = {};

    vm.getJobs = function() {
        console.log(vm.jobString);
        $http({
            method: 'GET',
            url: 'http://api.indeed.com/ads/apisearch?publisher=9447015102421242&q='+vm.jobString+'&l=atlanta&sort=date&radius=&st=&jt=&start=&limit=25&fromage=30&filter=&latlong=&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2&format=json'
        }).then(
            // success
            function(response) {
                vm.allJobs = response.data.results;
                console.log('getJobs() success, jobs: ', vm.allJobs);
            }, // error
                function(error) {
                console.log('GET to /api/jobs failed: ', error);
            });
        };

    // vm.consoleMe = function(job) {
    //     console.log(job);
    //     $http({
    //         method: 'POST',
    //         url: 'api/jobs'
    //     });
    // };
});








/* CONTROLLERS */
app.controller('profileCtrl', function($http) {
    var vm = this;


    vm.console = function(jobId) {
        console.log('button works!', jobId);
        $http({
            method: 'BANANA',
            url: 'api/jobs/' + jobId
        }).then(httpSuccess, onError);

        function httpSuccess(response) {
            vm.jobsList = response.data;
        }

        function onError(error) {
            console.log('GET to /api/jobs failed: ', error);
        }
    }

    // vm.reloadJobs = function() {
    //     console.log('RELOAD JOBS FIRED UP');
    //     $http({
    //         method: 'GET',
    //         url: '/api/jobs'
    //     }).then(httpSuccess, onError);
    //
    //     function httpSuccess(response) {
    //         vm.jobsList = response.data;
    //     }
    //
    //     function onError(error) {
    //         console.log('GET to /api/jobs failed: ', error);
    //     }
    // };

    $http({
        method: 'GET',
        url: '/api/jobs'
    }).then(httpSuccess, onError);

    function httpSuccess(response) {
        vm.jobsList = response.data;
    }

    function onError(error) {
        console.log('GET to /api/jobs failed: ', error);
    }
});

app.controller('resultsCtrl', function($http) {
    var vm = this;
    vm.indeedResults = [];

    $http({
        method: 'GET',
        url: '/api/results'
    }).then(httpSuccess, onError);

    function httpSuccess(response) {
        vm.indeedResults = response.data.results;
    }

    function onError(error) {
        console.log('GET to /api/jobs failed: ', error);
    }
});
