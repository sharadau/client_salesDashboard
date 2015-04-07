'use strict';

/**
 * @ngdoc function
 * @name dashboardApp.controller:ProspectViewCtrl
 * @description
 * # ProspectViewCtrl
 * Controller of the dashboardApp
 */
angular.module('dashboardApp')
  .controller('ProspectViewCtrl', function ($scope, $stateParams, ProspectService, Emails) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

     console.log("pros id: "+$stateParams.prospectId);
    //$stateParams.prospectId = 3;
    ProspectService.getProspect($stateParams.prospectId)
      .success (function (data){
      $scope.prospect = data;
     console.log(data);
    })
      .error (function (error){
      console.log (error.msg);});

    $scope.deleteProspect = function(prospectId) {
      ProspectService.deleteProspect(prospectId);
    }
    
    //retrieve emails for stage1
    Emails.getEmailsForProspectStage($stateParams.prospectId, "1")
    .success (function (data){
    $scope.emailsForStage1 = data;
    console.log("in view cntroller: "+$scope.emailsForStage1[0].subject);
  })
    .error (function (error){
    console.log (error.msg);});

  $scope.deleteProspect = function(prospectId) {
    ProspectService.deleteProspect(prospectId);
  }
  $scope.markComplete = function(prospectId, stage, stage_id) {
	    ProspectService.updateStage(prospectId, stage, stage_id);
	  console.log("prospectId: "+prospectId+" stage: "+stage);
	  };
  //stage2 email
  Emails.getEmailsForProspectStage($stateParams.prospectId, "2")
  .success (function (data){
  $scope.emailsForStage2 = data;
  console.log("in view cntroller: "+$scope.emailsForStage2[0].subject);
})
  .error (function (error){
  console.log (error.msg);});

//stage3 email
  Emails.getEmailsForProspectStage($stateParams.prospectId, "3")
  .success (function (data){
  $scope.emailsForStage3 = data;
  console.log("in view cntroller: "+$scope.emailsForStage3[0].subject);
})
  .error (function (error){
  console.log (error.msg);});

//stage4 email
  Emails.getEmailsForProspectStage($stateParams.prospectId, "4")
  .success (function (data){
  $scope.emailsForStage4 = data;
  console.log("in view cntroller: "+$scope.emailsForStage4[0].subject);
})
  .error (function (error){
  console.log (error.msg);});

//stage5 email
  Emails.getEmailsForProspectStage($stateParams.prospectId, "5")
  .success (function (data){
  $scope.emailsForStage5 = data;
  console.log("in view cntroller: "+$scope.emailsForStage5[0].subject);
})
  .error (function (error){
  console.log (error.msg);});

    $scope.oneAtATime = true;

       $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };
  });
