app.controller('reportTabController',
    function($rootScope, $scope, $http, $uibModal, Upload, requestManager,
        dateTimeFilter, Districts, Services, clientId, Modal, AuthService, USER_ACCESS, $location, SweetAlert){
        //Initializa $scope variable
    $scope.report = {
        serviceRequestId:1,
        serviceSubject:"",
        serviceName:"",
        happenDatetime:"",
        requestedDatetime:"",
        description:"",
        address:"",
        latitude: 0,
        longitude: 0,
        statusId:0,
        user: null,
        mediaUrl:"",
    };

    $scope.active = 0;
    $scope.report.services = $rootScope.services;
    $scope.report.districts = $rootScope.districts;
    $scope.showSpinner = false
    $scope.tabActivity=[true, false, false, false];
    // Handle show date time
    var dtpicker = $("#dtBox").DateTimePicker({
        dateTimeFormat: "YYYY-MM-dd HH:mm:ss"
    });
    var count = 0;
    $scope.initMap = function(){
        var myLatLng = {lat: 10.78, lng: 106.65};
        $scope.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: myLatLng
        });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function success(pos) {
                $("#latitude").val(Number((pos.coords.latitude).toFixed(3)));
                $("#longitude").val(Number((pos.coords.longitude).toFixed(3)));
                var latlng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                $scope.report.latitude = pos.coords.latitude;
                $scope.report.longitude = pos.coords.longitude;
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
                    $scope.report.latitude = event.latLng.lat();
                    $scope.report.longitude = event.latLng.lng();
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

    this.selectTab = function(setTab){
        $scope.activeTab = setTab;
        if (setTab == 1) {
            $scope.initMap();
        }
    };
    this.isSelectedTab = function(checkTab){
        return $scope.tab === checkTab;
    };

    this.submitReport = function() {
        // if($scope.report.service.subject == 'undefined' || request.serviceName == '' || request.happenDatetime == '' || request.description == '' || $scope.report.street == '' || $scope.report.ward == '' || $scope.request.district == '') {
        //     SweetAlert.swal("Error!", "Vui lòng điền đầy đủ thông tin!", "error");
        //     return;
        // }

        $scope.showSpinner = true;
        var request = new Object();
        request.serviceRequestId = 1;
        request.serviceSubject = $scope.report.service.subject;
        request.serviceName = $scope.report.serviceName;
        request.happenDatetime = dateTimeFilter($scope.report.happenDateTime);
        request.requestedDatetime = dateTimeFilter(new Date());
        request.description = $scope.report.description;
        request.address = $scope.report.street + ", Phường " + $scope.report.ward + ", Quận " + $scope.report.district;
        request.latitude = $scope.report.latitude;
        request.longitude = $scope.report.longitude;
        request.statusId = 0;
        request.user = $rootScope.user;

        
        if($scope.report.picFile) {
            Upload.base64DataUrl($scope.report.picFile).then(
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
                        request.mediaUrl = response.data.data.link;
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
        return AuthService.isAuthorized(USER_ACCESS) || $rootScope.userRole == 'guest';
           
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