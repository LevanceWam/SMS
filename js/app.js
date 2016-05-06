var drawApp = angular.module('drawApp',
['ngRoute', 'firebase']).constant('FIREBASE_URL','https://drawingappli.firebaseIO.com/');

drawApp.run(['rootScope', '$location',
function($rootScope, $location) {
  $rootScope.$on('$routechangeError',
function(event,next,previous,error){
  if (error=='AUTH_REQUIRED'){
    $rootScope.message = 'Please log in to continue.';
    $location.path('/login')
  } // This is my authentication
});
}]);// I runninng

drawApp.config(['$routeProvider', function($routeProvider){
  $routeProvider.
  when('/login',{
    templateUrl: 'views/login.html',
    controller: 'RegiController'
  }).
  when('/register',{
    templateUrl: 'views/register.html',
    controller: 'RegiController'
  }).
  when('/draw',{
    templateUrl: 'views/draw.html',
    controller: 'DrawController',
    resolve: {
      currentAuth: function(Authentication){
      return Authentication.requireAuth();
    }// this auth
  }//resolve
  }).
  otherwise({
    redirectTo: '/login'
  });
}]);
