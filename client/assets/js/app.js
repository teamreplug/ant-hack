var antApp = angular.module('antApp', ['antApp.controllers', 'ui.router'])

antApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/login")
     
    $stateProvider
        .state('view_note', {
            url: "/view_note",
            templateUrl: "views/view_note.html"
        })
        .state('view_photo', {
            url: "/view_photo",
            templateUrl: "views/view_photo.html"
        })
        .state('add_note', {
            url: "/add_note",
            templateUrl: "views/add_note.html"
        })
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html"
        })
        .state('register', {
            url: "/register",
            templateUrl: "views/register.html"
        })
}]);