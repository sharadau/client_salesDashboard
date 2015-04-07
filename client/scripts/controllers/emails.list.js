'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:EmailsListCtrl
 * @description
 * # EmailsListCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('EmailsListCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.emails = [
      {subject: "Initied Yvolver",body:"New",_id:"1",date:"12/10/2014"},
      {subject: "Initied PayWize",body:"Internal Preparation",_id:"2",date:"02/10/2014"},
      {subject: " Initied CNM Connect",body:"Initiation",_id:"3",date:"12/12/2014"}
    ];
  });
