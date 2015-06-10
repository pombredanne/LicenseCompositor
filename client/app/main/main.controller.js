'use strict';

angular.module('licenseCompositorApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.selectedLicense1 = null;
    $scope.selectedLicense2 = null;
    $scope.selectedLicense3 = null;

    $scope.$watch("selectedLicense1", function(newValue, oldValue) {
      console.log(oldValue);
      console.log(newValue);
      //Fetch the license from the data folder and render it!
    });

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });
