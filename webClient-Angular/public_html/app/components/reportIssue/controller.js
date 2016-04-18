app.controller('reportTabController', ['$scope', '$http', '$uibModal', 'Upload', 'requestManager', 
	'convertServiceCodeFilter', 'dateTimeFilter', 'districts', 'issues', 'clientId', 
	function($scope, $http, $uibModal, Upload, requestManager, convertServiceCodeFilter, 
		dateTimeFilter, districts, issues, clientId){
	this.tab = 1;
	$scope.issues = issues;
	$scope.serviceType = issues["Điện"];
	$scope.districts = districts;
	$scope.district = districts["1"];
	$scope.latitude = 10.78;
	$scope.longitude = 106.65;
    // Handle show date time
    var dtpicker = $("#dtBox").DateTimePicker({
        dateTimeFormat: "yyyy-MM-dd HH:mm:ss"
    });
    
	this.initMap = function(){
		var myLatLng = {lat: 10.78, lng: 106.65};
	    $scope.map = new google.maps.Map(document.getElementById('map'), {
	        zoom: 12,
	        center: myLatLng
	    });   
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function success(pos) {
/*			    $("#latitude").val(Number((pos.coords.latitude).toFixed(3)));
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
			    });*/
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
	};
	this.initMap();
	this.selectTab = function(setTab){
		this.tab = setTab;
	};
	this.isSelectedTab = function(checkTab){
		return this.tab === checkTab;
	};

	this.submitReport = function() {
		var request = new Object();
		request.serviceRequestId = 1;
		request.serviceCode = convertServiceCodeFilter($scope.serviceType);
		request.serviceName = $scope.serviceName.name;
		request.happenDatetime = dateTimeFilter($scope.happenDateTime);
		request.requestedDatetime = dateTimeFilter(new Date());
		request.description = $scope.description;
		request.address = $scope.street + ", Phường " + $scope.ward.name + ", Quận " + $("#disInfo option:selected").text();
		request.latitude = $scope.latitude;
		request.longitude = $scope.longitude;
		request.statusId = 1;
		if($scope.picFile) {
	        Upload.base64DataUrl($scope.picFile).then(
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
			            requestManager.postRequest(request);
			        }, function errorCallback(err) {
			        });	               
	            });
		}
		else {
			requestManager.postRequest(request);
		}
	}

	$scope.logInModal = function(){
		var modalInstance = $uibModal.open({
			templateUrl: 'app/components/login/view.html',
			controller: 'logInModalController',
			resolve: {
			}
		});

		modalInstance.result.then(function close(user) {
			$scope.name = user.userName;
			$scope.email = user.userEmail;
			$scope.phone = user.userPhone;
			$scope.id = user.userId;
		}, function dismiss() {
			console.log("Modal dismiss");
		});
  	};

  	$scope.signUpModal = function(){
		var modalInstance = $uibModal.open({
			templateUrl: 'app/components/signup/view.html',
			controller: 'signUpModalController',
			resolve: {
			}
		});

		modalInstance.result.then(function close(user) {
			$scope.name = user.userName;
			$scope.email = user.userEmail;
			$scope.phone = user.userPhone;
			$scope.id = user.userId;
		}, function dismiss() {
			console.log("Modal dismiss");
		});
  	};
}]);