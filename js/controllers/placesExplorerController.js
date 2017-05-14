app.controller('placesExplorerController', function ($scope, $location, $window, placesExplorerService, $filter, myCoordinates, placesPhotosService, $uibModal) {
  
	
	var forceSSL = function () {
	    if ($location.protocol() !== 'https') {
		$window.location.href = $location.absUrl().replace('http', 'https');
    		}	
	};
	forceSSL();
	
	$scope.exploreNearby = "";
    $scope.exploreQuery = "";
    $scope.categoryofresults = "food";

    $scope.filterValue = "";
    $scope.photo = "";
 
    $scope.places = [];
    $scope.filteredPlaces = [];
    $scope.filteredPlacesCount = 0;
 
    //paging
 
    $scope.pageSize = 10;
    $scope.currentPage = 1;
    $scope.totalRecordsCount = 0;

 
    init();
 
    function init() {
 
        createWatche();
        getPlaces();
    }
 
    

    function getPlaces() {
 
        var offset = ($scope.pageSize) * ($scope.currentPage - 1);
        myCoordinates.then(function (data){
		$scope.ll = data.lat + ',' + data.lng;
	
 
        placesExplorerService.get({ ll: $scope.ll, near: $scope.exploreNearby , query: $scope.exploreQuery+' ' + $scope.categoryofresults, limit: $scope.pageSize, offset: offset }, function (placesResult) {
 
            if (placesResult.response.groups) {
                $scope.places = placesResult.response.groups[0].items;
                $scope.totalRecordsCount = placesResult.response.totalResults;
                filterPlaces('');
            }
            else {
                $scope.places = [];
                $scope.totalRecordsCount = 0;
            }
        });
    });
    };
 
    function filterPlaces(filterInput) {
        $scope.filteredPlaces = $filter("placeNameCategoryFilter")($scope.places, filterInput);
        $scope.filteredPlacesCount = $scope.filteredPlaces.length;
    }
 
    function createWatche() {
 
        $scope.$watch("filterValue", function (filterInput) {
            filterPlaces(filterInput);
        });
    }
 
    $scope.doSearch = function () {
 
        $scope.currentPage = 1;
        getPlaces();
    };
 
    $scope.pageChanged = function (page) {
 
        $scope.currentPage = page;
        getPlaces();
    };
 
    $scope.buildCategoryIcon = function (icon) {
 		if(icon!= undefined){
 			return icon.prefix + '44' + icon.suffix;
 		}
 		else{
 			console.log("No Icon");
 		}
        
    };

    $scope.priceHandler = function (price) {
    	if(price!= undefined){
    		if(price.tier == 1){
    			return price.currency;
    		}
    		else if(price.tier == 2){
    			return price.currency + price.currency;
    		}
    		else if (price.tier == 3){
    			return price.currency + price.currency + price.currency;
    		}
    		else {
    			return price.currency + price.currency+ price.currency+ price.currency;
    		}
    	}

    };
 
    $scope.buildVenueThumbnail = function (photo) {
 	
 	if(photo!= undefined){
        return photo.items[0].prefix + '128x128' + photo.items[0].suffix;
 	}
 	else {
 		console.log("No Photo");
 	}
    };

$scope.showVenuePhotos = function (venueId, venueName) {

        placesPhotosService.get({ venueId: venueId }, function (photosResult) {

            var modalInstance = $uibModal.open({
                templateUrl: 'views/placesphotos.html',
                controller: 'placesPhotosController',
                resolve: {
                    venueName: function () {
                        return venueName;
                    },
                    venuePhotos: function () {
                        return photosResult.response.photos.items;
                    }
                }
            });

            modalInstance.result.then(function () {
                //$scope.selected = selectedItem;
            }, function () {
                //alert('Modal dismissed at: ' + new Date());
            });

        });

    };

      	});


