app.factory('myCoordinates', ['$q', function myCoordinates($q) {

	var deferred = $q.defer();

	function getCoordinates(coordinates){
		var myCoordinates = {};
		myCoordinates.lat = 51.5074;  //London Latitude	
		myCoordinates.lng = -0.118092	;   //London Longitude
		deferred.resolve(myCoordinates);
	}

	return deferred.promise;

}])
