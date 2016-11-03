app.controller('testTabController',
    function($rootScope, $scope, $http, $uibModal, Upload, requestManager, convertServiceCodeFilter,
        dateTimeFilter, Districts, Services, clientId, Modal, AuthService, USER_ACCESS, $location, SweetAlert){
    $scope.active = 0;
    this.services = null;
    this.districts = null;
    this.services = $rootScope.services;
    this.districts = $rootScope.districts;
    this.latitude = 10.78;
    this.longitude = 106.65;
    $scope.showSpinner = false
    $scope.tabActivity=[true, false, false, false];
    // Handle show date time
    var dtpicker = $("#dtBox").DateTimePicker({
        dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
    });
    var count = 0;
    $scope.initMap = function(){
        var myLatLng = {lat: 10.78, lng: 106.65};
        $scope.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: myLatLng
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function success(pos) {
                $("#latitude").val(Number((pos.coords.latitude).toFixed(3)));
                $("#longitude").val(Number((pos.coords.longitude).toFixed(3)));
                var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: $scope.map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    title: "Di chuyển để xác định đúng vị trí"
                });
                $scope.map.setCenter(latlng);
                $scope.map.setZoom(15);
                google.maps.event.addListener(marker, "dragend", function (event) {
                    $("#latitude").val(Number((event.latLng.lat()).toFixed(3)));
                    $("#longitude").val(Number((event.latLng.lng()).toFixed(3)));
                    $scope.map.setCenter(event.latLng);
                });
            }
                , function (errMsg) {
                console.log(errMsg);
            }, {
                enableHighAccuracy: false,
                timeout: 6 * 1000,
                maximumAge: 1000 * 60 * 10
            });
        } else {
            alert("Do not support Geolocation");
        }
        $scope.$watch('active', function(newValue){
            window.setTimeout(function(){
            google.maps.event.trigger($scope.map, 'resize');
                                             },100);
        });
    };
    $scope.$watch('active', function(newValue){
        if (newValue == 1) {
            $scope.initMap();
        }
    });
    // Implement upload multiple images


    // $scope.upload = function() {
    //  if($scope.picFile) {
    //      console.log("upload");
    //      Upload.base64DataUrl($scope.picFile).then(
 //            function (url){
 //                 var uploadImageBase64 = url.replace(/data:image\/(png|jpg|jpeg);base64,/, "");
    //          $http({
    //              headers: {'Authorization': 'Client-ID ' + clientId},
    //              url: '  https://api.imgur.com/3/upload',
    //              method: 'POST',
    //              data: {
    //                  image: uploadImageBase64,
    //                  'type':'base64'
    //              }
    //          }).then(function successCallback(response) {
    //              request.mediaUrl = response.data.data.link;
    //          }, function errorCallback(err) {
    //              console.log(err);
    //          });
 //            });
    //  }
    //  console.log("not upload");

    // }

    this.selectTab = function(setTab){
        $scope.active = setTab;
    };
    this.isSelectedTab = function(checkTab){
        return $scope.tab === checkTab;
    };

    this.submitReport = function() {
        $scope.showSpinner = true;
        var request = new Object();
        request.serviceRequestId = 1;
        request.serviceCode = this.serviceCode;
        request.serviceName = this.serviceName;
        request.happenDatetime = dateTimeFilter(this.happenDateTime);
        request.requestedDatetime = dateTimeFilter(new Date());
        request.description = this.description;
        request.address = this.street + ", Phường " + this.ward.name + ", Quận " + $("#disInfo option:selected").text();
        request.latitude = this.latitude;
        request.longitude = this.longitude;
        request.statusId = 0;
        request.user = $rootScope.user;
        if(this.picFile) {
            console.log("Here");
            Upload.base64DataUrl(this.picFile).then(
                function (url){
                    var uploadImageBase64 = url.replace(/data:image\/(png|jpg|jpeg);base64,/, "");
                    $http({
                        headers: {'Authorization': 'Client-ID ' + clientId},
                        url: '  https://api.imgur.com/3/upload',
                        method: 'POST',
                        data: {
                            image: uploadImageBase64,
                            'type':'base64'
                        }
                    }).then(function successCallback(response) {
                        console.log("data link : " + response.data.data.link);
                        request.mediaUrl = response.data.data.link;
                        console.log(request.mediaUrl);
                        console.log(JSON.stringify(request));
                        requestManager.postRequest(request).then(
                            function success(){
                                $scope.showSpinner = false;
                                SweetAlert.swal({
                                    title: "OK",
                                    text: "Bạn đã gửi yêu cầu thành công!",
                                    type: "success",
                                    timer: 1000,
                                    showConfirmButton: false
                                });
                                requestManager.loadAllRequests().then(function(requests){
                                    $rootScope.requests = requests;
                                });
                                $location.path('/list');
                            },
                            function error(err){
                                $scope.showSpinner = false;
                                SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi yêu cầu!", "error");
                            });
                    }, function errorCallback(err) {
                        $scope.showSpinner = false;
                        SweetAlert.swal("Error!", "Xảy ra lỗi khi upload anh!", "error");
                    });
                });
        }
        else {
            requestManager.postRequest(request).then(
                function success(){
                    $scope.showSpinner = false;
                    SweetAlert.swal("OK!", "Bạn đã gửi yêu cầu thành công!", "success");
                    requestManager.loadAllRequests().then(function(requests){
                        $rootScope.requests = requests;
                    });
                    $location.path('/list');
                },
                function error(err){
                    $scope.showSpinner = false;
                    SweetAlert.swal("Error!", "Xảy ra lỗi khi gửi yêu cầu!", "error");
                });
        }
    }

    $scope.checkAuthorization = function () {
        if(AuthService.isAuthorized(USER_ACCESS) || $rootScope.userRole == 'guest')
            $scope.active = 3;
        else {
            console.log("HERE");
            Modal.logInModal();
        }
    };

    $scope.isAuthorizedGuest = function () {
        return AuthService.isAuthorized(USER_ACCESS) || $rootScope.userRole == 'guest';
    };

    $scope.logInModal = function(){
        Modal.logInModal();
    };

    $scope.signUpModal = function(){
        Modal.signUpModal();
    };

    $scope.logInAsGuestModal = function(){
        Modal.logInAsGuestModal();
    };
});