drawApp.factory('Authentication',
['$rootScope','$firebaseAuth','$firebaseObject',
'$location','FIREBASE_URL',
function($rootScope, $firebaseAuth, $firebaseObject,
$location, FIREBASE_URL) {

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  auth.$onAuth(function(authUser){
    if(authUser) {
      var userRef = new Firebase(FIREBASE_URL+ 'users/' + authUser.uid);
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });

  var theUser = {
    login: function(user) {
      auth.$authWithPassword({
        email:user.email,
        password: user.password
      }).then(function (regUser){
        $location.path('/draw');
      }).catch(function(error){
        $rootScope.message = error.message;
      });
    },//end of login

    logout: function(){
      return auth.$requireAuth();
    },// end of log out

    requireAuth: function (){
      return auth.$requireAuth();
    },//end of requireAuth

    register:function(user){
      auth.$createUser({
        email:user.email,
        password:user.password
      }).then(function(regUser){
          var regRef = new Firebase(FIREBASE_URL + 'users')
          .child(regUser.uid).set({
            date: Firebase.ServerValue.TIMESTAMP,
            regUser: regUser.uid,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email
          }); // end of the user

          theUser.login(user);
      }).catch(function(error){
        $rootScope.message = error.message;
      });
    }//end of register
  };

  return theUser;

}]);// factory end
