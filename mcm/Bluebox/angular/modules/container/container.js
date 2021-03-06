'use strict';

/**
 * bluebox.container
 * module for the container contents page
 */
var containerModule = angular.module('bluebox.container', [
        'ngFileUpload',
        'ui.router',
        'angular-inview',
        'elif',
        'bluebox.filter',
        'bluebox.fileSystem',
        'md.data.table'
    ])

    .config(['$stateProvider', '$httpProvider', function($stateProvider, $httpProvider) {
        $httpProvider.interceptors.push('loginErrorInterceptor');
        $stateProvider.state("containerState", {
            url:            "/container/:containerName",
            templateUrl:    "angular/modules/container/container.html",
            controller:     "ContainerController"
        });
    }]);