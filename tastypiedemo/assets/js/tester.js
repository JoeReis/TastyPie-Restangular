'use strict';

var tastyApp = angular.module('tastyApp',['restangular']);


// configure restangular to work with tastypie, which returns data in an objects list, meta data in a meta object
app.config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl("/api/v1");
    RestangularProvider.setResponseExtractor(function(response, operation, what, url) {
        var newResponse;
        if (operation === "getList") {
            newResponse = response.objects;
            newResponse.metadata = response.meta;
        } else {
            newResponse = response;
        }
        return newResponse;
    });
    RestangularProvider.setRequestSuffix('/?');
});



//functions