var app = angular.module('FoursquareApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'chieffancypants.loadingBar']);

app.config(function ($routeProvider) {
	
   $routeProvider.when("/explore", {
        controller: "placesExplorerController",
        templateUrl: "./views/placesresults.html"
    });
    $routeProvider.otherwise({ redirectTo: "/explore" });
 

 		
	});
