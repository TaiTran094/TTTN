app.controller('logInAsGuestModalController', 
	function($rootScope, $scope, $http, $uibModalInstance, $timeout, baseUrl, Modal){
	$scope.logIn = function(){
		var guest = new Object();
		guest.name = $scope.name;
		guest.email = $scope.email;
		$http.post(baseUrl + "/entity.guestuser", guest).then(
			function successCallBack(response){
				$uibModalInstance.close();
				$timeout(function(){
					$rootScope.user = guest;
					$rootScope.userRole = 'guest';
				});
			},
			function errorCallBack(response){
				$scope.error = "Xảy ra lỗi";
			});
	};
	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');
	}
	
	$scope.signUpModal = function () {
		$uibModalInstance.close();
		Modal.signUpModal();
	}

	$scope.logInModal = function() {
		$uibModalInstance.close();
		Modal.logInModal();		
	}

});