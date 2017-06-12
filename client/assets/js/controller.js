angular.module("antApp.controllers", ['ngStorage'])

.controller('loginController', function($scope, $rootScope, $http, $state, $localStorage){
	$http.defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJhbnQtaGFjayIsImlhdCI6MTQ5NzAzNTg0OX0.2YwkTDwSO9khGSvJNk1ZRdiZYdKkSo-DH7AnlnIjNh8';
		
	delete $localStorage.currentUser 

	$scope.showloader = false;

	$scope.login = function(user){
		console.log(user)
		$scope.showloader = true;
		$http.post("/login", user).then(function(response){
			$scope.showloader = false;
			if(response.data.status == "success"){
				//move to proper route 
				$localStorage.currentUser = response.data.user
				$state.go('view_note');
			}else{
				console.log(response.data.message)
			}
		}, function(error){
			$scope.showloader = false;
			console.log(error.data.message)
		})
	}

})
.controller('noteController', function($scope, $rootScope, $http, $state, $localStorage){
	$http.defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJhbnQtaGFjayIsImlhdCI6MTQ5NzAzNTg0OX0.2YwkTDwSO9khGSvJNk1ZRdiZYdKkSo-DH7AnlnIjNh8';
	
	if(!$localStorage.currentUser){
		$state.go('login');
	}

	$scope.isAdmin = () => {
		if($localStorage.currentUser.role == 0){
			return false;
		}else{
			return true;
		}
	}

	$scope.allNotes = [];

	$scope.isNote = () =>{
		if($scope.allNotes.length > 0){
			return true
		}else{
			return false
		}
	}

	$scope.getNotes = () => {
		$http.get("/note").
		then((response)=>{
			if(response.data.status == "success"){
				$scope.allNotes = response.data.notes;
			}else{
				console.log(reponse.data.message);
			}
		}, (error)=>{
			console.log(error.data.message)
		})
	}
	$scope.getNotes();

	$scope.showloader = false;
	$scope.addNote = (note) => {
		note.date_added = Date();

		// to be changed to currentUser
		note.added_by = $localStorage.currentUser.email

		$scope.showloader = true;
		$http.post("/note", note)
		.then((response)=>{
			$scope.showloader = false;
			if(response.data.status == "success"){
				console.log(response.data.message)
				$scope.note = {}
			}else{
				console.log(response.data.message)
			}
		}, (error) =>{
			$scope.showloader = false;
			console.log(error.data.message)
		})

	}
	$scope.toHide = ""
	$scope.isReveal = (id) => {
		if($scope.toHide == ""){
			return false
		}
		else if($scope.toHide == id){
			return true
		}
	}

	$scope.deleteNote = (id) =>{
		$scope.toHide = id
		$http.delete("/note/"+id)
		.then((response)=>{
			$scope.toHide = ""
			if(response.data.status == "success"){
				$scope.getNotes();
				console.log(response.data.message)
			}else{
				console.log(response.data.message)
			}
		},(error)=>{
			$scope.toHide = ""
		})

	}

})
.controller('regController', function($scope, $rootScope, $http, $state, $localStorage){
	$http.defaults.headers.common.Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOiJhbnQtaGFjayIsImlhdCI6MTQ5NzAzNTg0OX0.2YwkTDwSO9khGSvJNk1ZRdiZYdKkSo-DH7AnlnIjNh8';

	delete $localStorage.currentUser;
	// if(!$localStorage.currentUser){
	// 	$state.go('login');
	// }

	$scope.showloader = false;
	$scope.register = (user) => {
		user.role = 0;
		$scope.showloader = true;

		$http.post("/register", user)
		.then((response)=>{
			$scope.showloader = false;
			if(response.data.status == "success"){
				console.log(response.data.message)
				$state.go('login')
			}else{
				console.log(response.data.message)
			}
		}, (error)=>{
			$scope.showloader = false;
			console.log(error.data.message)
		})

	}
})
.controller('photoController', function($scope, $rootScope, $http,$state, $localStorage){

	// if(!$localStorage.currentUser){
	// 	$state.go('login');
	// }

	$scope.SPLASH_URL = "https://api.unsplash.com/photos/?page=1&per_page=10&order_by=popular&client_id=2bf7ca547829bf13094e7bdfbaade0455848fa2307269fa01fcbe52e9ede5028"
	$scope.allPhotos = []

	$scope.isPhotos = () => {
		if($scope.allPhotos.length >0){
			return true;
		}else{
			return false;
		}
	}

	$scope.getPhotos = () => {
		$http.get($scope.SPLASH_URL)
		.then((response)=>{
			$scope.allPhotos = response.data
		}, (error)=>{
			console.log(error)
		})
	}
	$scope.getPhotos()
	
})