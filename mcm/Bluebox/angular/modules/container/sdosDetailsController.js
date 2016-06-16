'use strict';


function sdosDetailsController($scope, $http, $mdMedia, $mdDialog) {
    console.log("SDOS");
    $scope.sdosStats = "";
    var ctrl = this;

    function getSdosStats() {
        $http
            .get('swift/containers/' + ctrl.container.name + '/objects/__mcm__/sdos_slot_mapping_stats')
            .then(
                function successCallback(response) {
                    $scope.sdosStats = (response.data) ? response.data : "COULD NOT GET DETAILS FROM SERVER";

                },
                function errorCallback(response) {
                    $scope.sdosStats = "ERROR GETTING DETAILS FROM SERVER: " + response.data;
                });

    };

    function getSdosCascadeStructure() {
        $http
            .get('swift/containers/' + ctrl.container.name + '/objects/__mcm__/sdos_tree_geometry')
            .then(
                function successCallback(response) {
                    $scope.sdosCascadeStructure = response.data;

                },
                function errorCallback(response) {
                    $scope.sdosCascadeStructure = "ERROR GETTING DETAILS FROM SERVER: " + response.data;
                });

    };
    function getSdosSlotAllocation() {
        $http
            .get('swift/containers/' + ctrl.container.name + '/objects/__mcm__/sdos_slot_mapping')
            .then(
                function successCallback(response) {
                    $scope.sdosSlotAllocation = response.data;

                },
                function errorCallback(response) {
                    $scope.sdosSlotAllocation = "ERROR GETTING DETAILS FROM SERVER: " + response.data;
                });

    };

    $scope.showCascadeSheet = function (ev) {
        getSdosCascadeStructure();
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: SdosSheetController,
            templateUrl: 'angular/modules/container/sdosCascadeSheet.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
            scope: $scope,
            preserveScope: true
        });

        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

    $scope.showMappingSheet = function (ev) {
        getSdosSlotAllocation();
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: SdosSheetController,
            templateUrl: 'angular/modules/container/sdosMappingSheet.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen,
            scope: $scope,
            preserveScope: true
        });

        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };


    getSdosStats();
}

angular.module('bluebox.container').component('sdosDetails', {
    templateUrl: 'angular/modules/container/sdosDetails.html',
    controller: sdosDetailsController,
    bindings: {
        container: '<'
    }
}).component('mcmMetaContainer', {
    templateUrl: 'angular/modules/container/mcmMetaContainer.html',
    bindings: {
        container: '<'
    }
});


function SdosSheetController($rootScope, $state, $scope, $mdDialog) {

    $scope.hide = function () {
        $mdDialog.hide();
    };
    $scope.cancel = function () {
        $mdDialog.cancel();
    };
};