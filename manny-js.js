

var userId;
var numsubmitted=0;
'use strict';

//grab a form
const form = document.querySelector('.contact-form');

//grab an input
const inputEmail = form.querySelector('#inputEmail');
const inputName = form.querySelector('#name');

//config your firebase push
const firebaseConfig = {
  apiKey: "AIzaSyDVdwqEM-C-PzSSRWe8CX4h0OSUpPUqk4Q",
  authDomain: "spacecon-emails-2021.firebaseapp.com",
  databaseURL: "https://spacecon-emails-2021-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "spacecon-emails-2021",
  storageBucket: "spacecon-emails-2021.appspot.com",
  messagingSenderId: "788090785076",
  appId: "1:788090785076:web:76c4470c6add568ff6a961",
  measurementId: "G-ECNHEFPBZ0"
};
firebase.initializeApp(config);

var ref = firebase.database().ref('SpaceCon');


ref.on("value", function(snapshot) {
   user=(snapshot.val().userId);
   //console.log(snapshot.val().userId);
}, function (error) {
   console.log("Error: " + error.code);
});

/*
//create a functions to push
    function firebasePush(input,name) {


        //prevents from braking
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        //push itself
        var mailsRef = firebase.database().ref('emails/'+name.value).push().set(
            {
                mail: input.value,
                name: name.value
            }
        );

    }
    */
    function writeUserData(userId, name, email) {


      firebase.database().ref('SpaceCon/users/' + userId).set({
        name: name.value,
        email: email.value,
      });
    }

//push on form submit
    if (form) {
        form.addEventListener('submit', function (evt) {
            evt.preventDefault();
            if (numsubmitted == 0){
                numsubmitted = 1;
                writeUserData(user.userId,inputName,inputEmail);
                user.userId=user.userId+1;
                firebase.database().ref('SpaceCon/userId').set({
                  userId: user.userId
                  });
                  $("#contactus")[0].reset();
            }






            //shows alert if everything went well.
            //return alert('Data Successfully Sent to Realtime Database');
        })
    }
