app.controller('reportManagementDetailModalController', function($rootScope, $scope, $uibModalInstance, requestIndex) {
	$scope.requestIndex = requestIndex;

	$scope.cancel = function(){
		$uibModalInstance.dismiss('cancel');

	};


});