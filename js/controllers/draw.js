// drawApp.controller('DrawController',
//  ['$scope', '$rootScope', '$firebaseAuth', '$firebaseArray',  'FIREBASE_URL',
//   function($scope, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL) {
//       var ref = new Firebase(FIREBASE_URL);
//       var auth = $firebaseAuth(ref);
//
//       auth.$onAuth(function(authUser){
//         if (authUser) {
//             var drawRef = new Firebase(FIREBASE_URL + 'users/' +
//           $rootScope.currentUser.$id + '/draw');
//           var drawInfo = $firebaseArray(drawRef);
//         }// User Authenticated
//       });// on auth
// }]); // Controller
