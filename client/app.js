var myApp = angular.module('myApp',['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
		/*.when('/', {
			templateUrl:'templates/list.html',
			controller:'trainController'
		})*/
		.when('/trains', {
			templateUrl:'templates/list.html',
			controller:'trainController'
		})
		.when('/trains/create', {
			templateUrl:'templates/add.html',
			controller:'trainController'
		})
		.when('/trains/:id/edit', {
			templateUrl:'templates/edit.html',
			controller:'trainController'
		})
		.when('/trains/:id/show', {
			templateUrl:'templates/show.html',
			controller:'trainController'
		})
		.when('/flights', {
			templateUrl:'templates/listF.html',
			controller:'flightController'
		})
		.when('/flights/create', {
			templateUrl:'templates/addF.html',
			controller:'flightController'
		})
		.when('/flights/:id/edit', {
			templateUrl:'templates/editF.html',
			controller:'flightController'
		})
		.when('/flights/:id/show', {
			templateUrl:'templates/showF.html',
			controller:'flightController'
		});
				
});
