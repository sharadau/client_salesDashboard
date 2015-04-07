'use strict';

/**
 * @ngdoc service
 * @name dashboardApp.prospect
 * @description
 * # prospect
 * Service in the dashboardApp.
 */
angular.module('dashboardApp')
  .service('ProspectService', function ($http) {
    var prospects = [];

    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getAllProspects = function () {
      //console.log("getAllprojects");
      var successCallback, errorCallback;
      var response = {
        success: function (callback) {
          successCallback = callback;
          return response;
        },
        error: function (callback) {
          errorCallback = callback;
          return response;
        }
      };

//fecth prospecs from nodejs server
      //$http.get('http://localhost:3000/api/projects')
        $http.get('https://boiling-eyrie-9085.herokuapp.com/api/projects')

        .success(function (items) {
          prospects = items;
          successCallback(prospects);
        })
        .error(function (error) {
          if (error) {
            errorCallback(error);
          }
        });

//fetch prospects from java server
     /* $.ajax({
        type: "POST",
        dataType: 'json',
        url: 'http://localhost:8080/SalesDashBoard/rest/prospect/fetchProspects/1',
        //crossDomain : true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
       .success(function (items) {
          prospects = items['data'];
          console.log("in service "+items['data']);          
          successCallback(prospects);
        })
        .error(function (error) {
          if (error) {
            errorCallback(error);
          }
        });

    */
      return response;

    };
    this.getProspect = function (prospectId) {
      var successCallback, errorCallback;
      var response = {
        success: function (callback) {successCallback = callback; return response;},
        error: function (callback) {errorCallback = callback; return response;}
      };
      console.log("prospect id: " + prospectId);
      $http.get('https://boiling-eyrie-9085.herokuapp.com/api/projects/'+prospectId)
        .success(function(item){
                successCallback(item);
        })
        .error(function(error){
          if (error) {
            errorCallback({msg: 'No prospect with: ' + prospectId + ' id'});
          }
        });

      return response;
    };

    this.addProspect = function(newProspect1) {
    	console.log("newProspect1:"+newProspect1.name);
      var newProspect={};
    //add prospect to nodejs server
      newProspect1.state = "Initiation";
      newProspect1.state_id = 1;   
      newProspect1.organization = newProspect1.company;
      newProspect1.employees = ['Ram','Raghu'];
      newProspect1.owner = 'Ram';
      newProspect1.openpositions = 2;
      newProspect1.reddays = 0;
      newProspect1.company = newProspect1.company;
      newProspect1.companyURL = newProspect1.companyUrl;
      newProspect1.description = newProspect1.description;
      newProspect1.othercomments = newProspect1.comments;
      newProspect1.sendEmail = newProspect1.sendEmail;
      newProspect1.updatedDate = new Date().toDateString();
      newProspect1.updatedBy = 1;  
     // newProspect1._id = newProspect1.id;
      //console.log(newProspect1);
      $http.post('https://boiling-eyrie-9085.herokuapp.com/api/projects', newProspect1)
     
    	 //add prospect to java server
       /* newProspect.name = newProspect1.name;
        newProspect.companyURL = newProspect1.company;
        newProspect.lookupvo = {'lookupId':9};
        newProspect.description = newProspect1.description;
        newProspect.createdDate = new Date().getTime();
        newProspect.createdBy = 1;
        newProspect.updatedDate = new Date().getTime();
        newProspect.updatedBy = 1;    
        newProspect.teamMixList = [{"lookupvo":{
            "lookupId":1
        },
        "quantity":4}];        
        	console.log(JSON.stringify(newProspect));
     
        $.ajax({
            type: "POST",
            dataType: 'json',
            data:JSON.stringify(newProspect),
            url: 'http://localhost:8080/SalesDashBoard/rest/prospect/create',
            //crossDomain : true,
            headers: {
              'Content-Type': 'application/json'
            }
          })*/
        .success(function (item) {
          prospects.push(item);
        })
        .error(function (error) {
          if (error) {
            errorCallback(error);
          }
        });
      
    };

    this.deleteProspect = function(projId) {
      $http.delete('https://boiling-eyrie-9085.herokuapp.com/api/projects/'+projId)
        .success(function (item) {var idx = getProspectIndex (prospects, '' + projId);
          if (idx !== -1) {
            prospects.splice(idx, 1);
          }
        })
        .error(function (error) {
          if (error) {
            errorCallback(error);
          }
        });
    };

    this.updateProspect = function(newProspect) {
      console.log("inputs:");
      console.log(newProspect);

        $http.put('https://boiling-eyrie-9085.herokuapp.com/api/projects/' + newProspect._id, newProspect)
          .success(function (item) {
            var idx = getProspectIndex(prospects, '' + newProspect._id);
            if (idx !== -1) {
              prospects[idx] = item;
            }
          })
          .error(function (error) {
            if (error) {
              console.log(error);
            }
          });

    };
    this.updateStage = function(prospect_id, stage,stage_id) {
        console.log("inputs:");
        var newProspect = {};
        newProspect._id = prospect_id;
        newProspect.stage = stage;
        newProspect.stage_id = stage_id;
        console.log(newProspect);
        
          $http.put('https://boiling-eyrie-9085.herokuapp.com/api/projects/updateStage/' + newProspect._id, newProspect)
            .success(function (item) {
            	 console.log("success");
            	 alert("Prospect stage completed");
            })
            .error(function (error) {
              if (error) {
                console.log(error);
              }
            });

      };


    this.getProspectByName = function (prospects, name) {
      if (!prospects) {
        return undefined;
      }
      var len = prospects.length;
      for (var idx = 0; idx < len; idx++) {
        if (prospects[idx].name === name) {
          return prospects[idx];
        }
      }
      if (len > 0) {
        return prospects[0];
      }
      return undefined;
    };

    var getProspectIndex = function (prospects, prospectId) {
      var len = prospects.length;
      for (var idx = 0; idx < len; idx++) {
        if ('' + prospects[idx]._id === prospectId) {
          return idx;
        }
      }
      return -1;
    };
  });
