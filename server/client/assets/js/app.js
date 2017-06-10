var antApp = angular.module('antApp', ['antApp.controllers', 'ui.router', 'ngStorage'])

antApp.config(['$stateProvider', '$urlRouterProvider', '$localStorageProvider', function($stateProvider, $urlRouterProvider, $localStorageProvider){
    $urlRouterProvider.otherwise("/login")
     
    $stateProvider
        // login
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: "loginController"
        })
        // register
        .state('register', {
            url: "/register",
            templateUrl: "views/register.html",
            controller: "regController"
        })
        // note routes
        .state('view_note', {
            url: "/view_note",
            templateUrl: "views/view_note.html",
            controller: "noteController"
        })
        .state('add_note', {
            url: "/add_note",
            templateUrl: "views/add_note.html",
            controller: "noteController"
        })

        // photo routes
        .state('view_photo', {
            url: "/view_photo",
            templateUrl: "views/view_photo.html",
            controller: "photoController"
        })
        
        $localStorageProvider.setKeyPrefix('ant-hack-');
        
}]);