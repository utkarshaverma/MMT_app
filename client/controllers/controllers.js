myApp.controller('trainController', function($scope,$route,$routeParams,$http){
	
	/*$scope.originalTrain = {
		name:"sample train",
		dest:"destination 1",
		origin:"origin 1",
		deptTime:"departure time",
		arivTime:"arrival time",
		numOfSeats:0,
		price:0
	};*/

	//4. copy originalTrain to train. train will be bind to a form 
	//$scope.trains = angular.copy($scope.originalTrain);

	$scope.getTrains = function(){
		console.log("now in getTrains");

		$http.get('/api/trains/').then(function(response){
			$scope.trains = response.data;
		});
	};
	$scope.showTrains = function(){
		console.log("now in showTrains");

		var id = $routeParams.id;
		$http.get('/api/trains/'+ id).then(function(response){
			$scope.trains = response.data;
		});
	};
	$scope.addTrains = function(){
		console.log("now in addTrains");
		//var id = $routeParams.id;
		$http.post('/api/trains/', $scope.train).then(function(response){
			console.log("now in addTrains");
			//$scope.trains = response.data;
			window.location.href = '/';
		});
	};
	$scope.updateTrains = function(){
		console.log("now in updateTrains");

		var id = $routeParams.id;
		$http.put('/api/trains/'+ id , $scope.train ).then(function(response){
			//$scope.trains = response.data;
			window.location.href = '/';
		});
	};
	$scope.deleteTrains = function(id){
		console.log("now in deleteTrains");

		var id = id;
		$http.delete('/api/trains/'+ id).then(function(response){
			$route.reload();
		});
	};

	$scope.bookTrains = function(id){
		alert("Booking ticket");
		var id = id;
		$http.post('/api/trains/'+ id).then(function(response){
			$route.reload();
		});
	};
	
	
});