'use strict';
app.controller('placesPhotosController', function ($scope, $uibModalInstance, venueName, venuePhotos) {

    $scope.venueName = venueName;
    $scope.venuePhotos = venuePhotos;

    $scope.close = function ()
    {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.buildVenuePhoto = function (photo) {

        return photo.prefix + '256x256' + photo.suffix;
    };
});