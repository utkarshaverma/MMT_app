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
			window.location.href = '#/trains';
		});
	};
	$scope.updateTrains = function(){
		console.log("now in updateTrains");

		var id = $routeParams.id;
		$http.put('/api/trains/'+ id , $scope.train ).then(function(response){
			//$scope.trains = response.data;
			window.location.href = '#/trains';
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


myApp.controller('flightController', function($scope,$route,$routeParams,$http){
	$scope.getFlights = function(){
		console.log("now in getFlights");

		$http.get('/api/flights/').then(function(response){
			$scope.flights = response.data;
		});
	};
	$scope.showFlights = function(){
		console.log("now in showFlights");

		var id = $routeParams.id;
		$http.get('/api/flights/'+ id).then(function(response){
			$scope.flights = response.data;
		});
	};
	$scope.addFlights = function(){
		console.log("now in addFlights");
		$http.post('/api/flights/', $scope.flight).then(function(response){
			console.log("now in addFlights");
			window.location.href = '#/flights';
		});
	};
	$scope.updateFlights = function(){
		console.log("now in updateFlights");

		var id = $routeParams.id;
		$http.put('/api/flights/'+ id , $scope.flights ).then(function(response){
			window.location.href = '#/flights';
		});
	};
	$scope.deleteFlights = function(id){
		console.log("now in deleteFlights");

		var id = id;
		$http.delete('/api/flights/'+ id).then(function(response){
			$route.reload();
		});
	};
	$scope.bookFlights = function(id){
		alert("Booking ticket");
		var id = id;
		$http.post('/api/flights/'+ id).then(function(response){
			$route.reload();
		});
	};

});
