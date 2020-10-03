var startUser = 0;
var user=0;


'use strict';




//config your firebase push
const config = {
  apiKey: "AIzaSyAN8F4CKWg0EBStu0xr3EKj3B2540y6-jE",
  authDomain: "spacecon-emails.firebaseapp.com",
  databaseURL: "https://spacecon-emails.firebaseio.com",
  projectId: "spacecon-emails",
  storageBucket: "spacecon-emails.appspot.com",
  messagingSenderId: "1034066458488",
  appId: "1:1034066458488:web:f9641fa550047bb79fba8d"

};
firebase.initializeApp(config);

var ref = firebase.database().ref('SpaceCon');


ref.on("value", function(snapshot) {
   user=(snapshot.val().users);
   //console.log(snapshot.val().users);
}, function (error) {
   console.log("Error: " + error.code);
});
exportToCsv = function() {
  var Results = [
    ["Name", "email"],
  ];
  for (i=0; i<(user.length-1); i++){
    Results[i+1]=[];

  }
  for (i=0; i<(user.length-1-startUser); i++){
    Results[i+1][0]=user[i+1+startUser]["name"];
    Results[i+1][1]=user[i+1+startUser]["email"];

  }

  for (i=0; i<(Results.length-1); i++){
    for (t=1; t<(Results.length-(1+i)); t++){
        if (Results[i+1][1] == Results[i+1+t][1] ) {
            Results.splice((i+1+t),1);
            t=t-1;
        }
    }
  }


  var CsvString = "";
  Results.forEach(function(RowItem, RowIndex) {
    RowItem.forEach(function(ColItem, ColIndex) {
      CsvString += ColItem + ',';
    });
    CsvString += "\r\n";
  });
  CsvString = "data:application/csv," + encodeURIComponent(CsvString);
 var x = document.createElement("A");
 x.setAttribute("href", CsvString );
 x.setAttribute("download","mailMergeData.csv");
 document.body.appendChild(x);
 x.click();
 firebase.database().ref('SpaceCon/emailsSent').set({
   emailsSent: Results.length
   });
}
