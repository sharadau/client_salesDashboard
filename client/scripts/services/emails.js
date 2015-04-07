'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.emails
 * @description
 * # emails
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('Emails', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	  var emails = [];
	    this.getEmailsForProspectStage = function (prospect_id, stage) {
	    	console.log("getEmailsForProspectStage");
	    	//prospect_id = 1;
	      var successCallback, errorCallback;
	      var response = {
	        success: function (callback) {successCallback = callback; return response;},
	        error: function (callback) {errorCallback = callback; return response;}
	      };
	      console.log("prospect id: " + prospect_id + " stage: "+stage);
	      $http.get('https://boiling-eyrie-9085.herokuapp.com/api/emails/'+prospect_id+'_'+stage)
	        .success(function(item){
	          successCallback(item);
	          
	        })
	        .error(function(error){
	          if (error) {
	        	  console.log(error);
	              errorCallback({msg: 'No emails with prospect id ' + prospect_id + ' for stage '+stage});
	          }
	        });

	      return response;
	    };
	    
	    this.sendEmail = function(newEmail, from, subject, prospect_id, stage) {
	    	
	    //add prospect to nodejs server
	      newEmail.stage = stage;
	      newEmail.subject = subject; 
	      newEmail.from = from;
	      newEmail.prospect_id = prospect_id;
	      newEmail.send_date = new Date().toLocaleString();
	     
	      $http.post('https://boiling-eyrie-9085.herokuapp.com/api/emails', newEmail)
	        .success(function (item) {
	        	emails.push(item);
	        })
	        .error(function (error) {
	          if (error) {
	            errorCallback(error);
	          }
	        });
	    };

  });
