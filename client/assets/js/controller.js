angular.module("antApp.controllers", [])

.controller('loginController', function($scope, $rootScope, $http){
	$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
	$http.defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJhbnQtaGFjayIsImlhdCI6MTQ5NzAzNTg0OX0.2YwkTDwSO9khGSvJNk1ZRdiZYdKkSo-DH7AnlnIjNh8';
	$scope.login = function(user){
		$http.post("/login", user).then(function(response){
			if(response.data.status == "success"){
				//move to proper route 

			}else{
				console.log(response.data.message)
			}
		}, function(error){
			console.log(error.message)
		})
	}

})
.controller('noteController', function($scope, $rootScope, $http){
	$http.defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJhbnQtaGFjayIsImlhdCI6MTQ5NzAzNTg0OX0.2YwkTDwSO9khGSvJNk1ZRdiZYdKkSo-DH7AnlnIjNh8';
	
	$scope.addNote = function(note){
		
	}

})
.controller('regController', function($scope, $rootScope){

})
.controller('photoController', function($scope, $rootScope){
	
})