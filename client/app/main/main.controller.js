'use strict';

angular.module('licenseCompositorApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [];
    $scope.licenses = [];
    $scope.licenses[0] = {
      'selectedLicense': 'CC-BY-4.0'
    };
    $scope.licenses[1] = {
      'selectedLicense': 'CC-BY-NC-SA-4.0'
    };
    $scope.licenses[2] = {
      'selectedLicense': 'CC-BY-SA-4.0'
    };
    $scope.store = null;
    $scope.license = null;

    $scope.getLicenses = function() {
      $scope.licenses.forEach(function(license) {
        if(license['selectedLicense']) {
          var licenseBaseUrl = '/assets/licenses/';
          var licenseUrl = licenseBaseUrl + license['selectedLicense'] + '.ttl';
          $http.get(licenseUrl).success(function(licenseTurtleString) {
            new rdfstore.Store(function(err, store) {
              store.load('text/turtle', licenseTurtleString, function(err, results) {
                if(err) {
                  console.log('Error during parsing! ' + err);
                }
                //Get requirements
                store.execute('SELECT ?requirement {?s <http://creativecommons.org/ns#requires> ?requirement}', function(err, results) {
                  if(err) {
                    console.log('Error during query execution! ' + err);
                  }
                  license.requirements = results;
                });
                //Get permissions
                store.execute('SELECT ?permission {?s <http://creativecommons.org/ns#permits> ?permission}', function(err, results) {
                  if(err) {
                    console.log('Error during query execution! ' + err);
                  }
                  license.permissions = results;
                });
                //Get prohibitions
                store.execute('SELECT ?prohibition {?s <http://creativecommons.org/ns#prohibits> ?prohibition}', function(err, results) {
                  if(err) {
                    console.log('Error during query execution! ' + err);
                  }
                  license.prohibitions = results;
                });
              });
            });
          });
        }
      });
    };

    $scope.getLicenses();

    $scope.$watch('licenses', function(licenses, oldLicenses) {
      $scope.getLicenses();
    }, true);

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

  });
