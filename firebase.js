 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAenXio8zyXXiLsbMUhajM2757IJhum-cw",
    authDomain: "geopoint-7a688.firebaseapp.com",
    databaseURL: "https://geopoint-7a688.firebaseio.com",
    projectId: "geopoint-7a688",
    storageBucket: "geopoint-7a688.appspot.com",
    messagingSenderId: "728432659744"
  };
  firebase.initializeApp(config);
  
   /**
     * Handles the sign in button press.
     */
    function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Veuillez entrer une adresse email.');
          return;
        }
        if (password.length < 4) {
          alert('Veuillez entrer un mot de passe.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Mauvais mot de passe.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          document.getElementById('quickstart-sign-in').disabled = false;
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
      document.getElementById('quickstart-sign-in').disabled = true;
    }
    /**
     * Handles the sign up button press.
     */
    function handleSignUp() {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var score = "0";
      if (email.length < 4) {
        alert('Veuillez entrer une adresse email.');
        return;
      }
      if (password.length < 4) {
        alert('Veuillez entrer un mot de passe.');
        return;
      }
      // Sign in with email and pass.
      // [START createwithemail]
      firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/weak-password') {
          alert('Le mot de passe est trop faible.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
	sendEmailVerification;
	
	       firebase.database().ref('users/' + userId).set({
    username: pseudo,
    email: email,
    score : score
  });

})
      });
      // [END createwithemail]
    }
    /**
     * Sends an email verification to the user.
     */
    function sendEmailVerification() {
      // [START sendemailverification]
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        // Email Verification sent!
        // [START_EXCLUDE]
        alert('Email de Verification envoyé !');
        // [END_EXCLUDE]
      });
      // [END sendemailverification]
    }
    function sendPasswordReset() {
      var email = document.getElementById('email').value;
      // [START sendpasswordemail]
      firebase.auth().sendPasswordResetEmail(email).then(function() {
        // Password Reset Email Sent!
        // [START_EXCLUDE]
        alert('Email de réinitialisation du mot de passe envoyé !');
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // [START_EXCLUDE]
        if (errorCode == 'auth/invalid-email') {
          alert(errorMessage);
        } else if (errorCode == 'auth/user-not-found') {
          alert(errorMessage);
        }
        console.log(error);
        // [END_EXCLUDE]
      });
      // [END sendpasswordemail];
    }
    /**
     * initApp handles setting up UI event listeners and registering Firebase auth listeners:
     *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
     *    out, and that is where we update the UI.
     */
    function initApp() {
      // Listening for auth state changes.
      // [START authstatelistener]
      firebase.auth().onAuthStateChanged(function(user) {
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-verify-email').disabled = true;
        // [END_EXCLUDE]
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
	  var score = user.score;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'connecté';
          document.getElementById('quickstart-sign-in').textContent = 'Se déconnecter';
          document.getElementById('quickstart-account-details').textContent = 'Vous avez '+ score + 'point(s)';
          if (!emailVerified) {
            document.getElementById('quickstart-verify-email').disabled = false;
	    document.getElementById('verifmail').style.display = "block";
	
          } else {
		     document.getElementById('verifmail').style.display = "none";
		     document.getElementById('quickstart-sign-up').style.display = "none";
		  document.getElementById('quickstart-account-details').style.display = "block";
	  }
          // [END_EXCLUDE]
        } else {
          // User is signed out.
          // [START_EXCLUDE]
          document.getElementById('quickstart-sign-in-status').textContent = 'déconnecté';
          document.getElementById('quickstart-sign-in').textContent = 'Se connecter';
          document.getElementById('quickstart-account-details').textContent = "Vous n'êtes pas connecté";
          // [END_EXCLUDE]
        }
        // [START_EXCLUDE silent]
        document.getElementById('quickstart-sign-in').disabled = false;
        // [END_EXCLUDE]
      });
      // [END authstatelistener]
      document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);
      document.getElementById('quickstart-sign-up').addEventListener('click', handleSignUp, false);
      document.getElementById('quickstart-verify-email').addEventListener('click', sendEmailVerification, false);
      document.getElementById('quickstart-password-reset').addEventListener('click', sendPasswordReset, false);
    }
    window.onload = function() {
      initApp();
    };
