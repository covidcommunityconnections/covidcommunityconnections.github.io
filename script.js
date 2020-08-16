//database connection
var firebaseConfig = {
  apiKey: "AIzaSyD-1MaCWh4ZkJqDm01P2iA9TajvIClBsaU",
  authDomain: "c-c-c-cc792.firebaseapp.com",
  databaseURL: "https://c-c-c-cc792.firebaseio.com",
  projectId: "c-c-c-cc792",
  storageBucket: "c-c-c-cc792.appspot.com",
  messagingSenderId: "490142429048",
  appId: "1:490142429048:web:d3bb81313019253724e28d",
  measurementId: "G-GBFK7CZQQL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var ExperienceReports = firebase.database().ref("ExperienceReports/");
var experience_id;
var reports;
var first = true;

ExperienceReports.once("value").then(function(snap) {
  localStorage.setItem("reports", JSON.stringify(snap.val()));
  //experiences = snap.val();
  reports = snap.val();
  experience_id = snap.numChildren();
    if (first) {
    show_experience_grid(6, -1);
    first = false;
  }
});

function show_experience(exp_num) {

  var chosen_experience = JSON.parse(
    localStorage.getItem("shuffled_experiences")
  )[exp_num];

  document.getElementById("popup_header").innerHTML = chosen_experience.title;
  document.getElementById("popup_description").innerHTML =
    chosen_experience.description;

  if (chosen_experience.age == "") {
    document.getElementById("popup_age").innerHTML = "";
  } else {
    document.getElementById("popup_age").innerHTML =
      "Age: " + chosen_experience.age;
  }

  var html_container_symptoms = document.getElementById("symptom_tags");
  html_container_symptoms.innerHTML = "";

  if (chosen_experience.symptoms == undefined) {
    // if symptoms branch exists
    document.getElementById("symp_title").innerHTML = "No Symptoms Reported";
  } else {
    document.getElementById("symp_title").style.display = "block";
    for (let symp of chosen_experience.symptoms) {
      var outers = document.createElement("div");
      var symp_txts = document.createTextNode(symp);
      outers.appendChild(symp_txts);
      html_container_symptoms.appendChild(outers);
    }
  }

  document.getElementById("popup").style.display = "block"; // the right popup
  document.getElementById("menu_cover").style.display = "block";
}

function show_experience_grid(grid_size, experience_array) {
  var html_container = document.getElementById("show_experiences");
  html_container.innerHTML = "";

  // get experiences from database here @DBase
  //experiences = JSON.parse(localStorage.getItem("reports"));
  var reports = JSON.parse(localStorage.getItem("reports"));

  // Dealing with search results or onload
  if (experience_array == -1) {
    // on load, show shuffled
    var shuffled = shuffle1(Array.from(reports));
  } else if (experience_array == 0) {
    // if no search results found
    var msg = document.createElement("h2");
    var msg_txt = document.createTextNode(
      "No Results Found! Try Searching for Something Else"
    );
    msg.appendChild(msg_txt);
    html_container.appendChild(msg);
  } else {
    // search results
    var shuffled = shuffle1(experience_array);
  }

  for (var i = 0; i < grid_size; i++) {
    // create experience boxes
    var tb = document.createElement("div");
    tb.classList.add("textbox");
    tb.id = "tb" + i.toString();
    var header = document.createElement("h2");
    var header_txt = document.createTextNode(shuffled[i].title);
    header.appendChild(header_txt);
    var paragraph = document.createElement("p");
    var paragraph_txt = document.createTextNode(shuffled[i].description);
    paragraph.classList.add("textbox_text");
    paragraph.appendChild(paragraph_txt);
    tb.appendChild(header);
    tb.appendChild(paragraph);

    html_container.appendChild(tb);
  }

  localStorage.setItem("shuffled_experiences", JSON.stringify(shuffled));

  document.getElementById("tb0").addEventListener("click", function() {
    show_experience(0);
  });
  document.getElementById("tb1").addEventListener("click", function() {
    show_experience(1);
  });
  document.getElementById("tb2").addEventListener("click", function() {
    show_experience(2);
  });
  document.getElementById("tb3").addEventListener("click", function() {
    show_experience(3);
  });
  document.getElementById("tb4").addEventListener("click", function() {
    show_experience(4);
  });
  document.getElementById("tb5").addEventListener("click", function() {
    show_experience(5);
  });
}

function search_experiences() {
  var search_input = document.getElementById("experiences_search").value;

  var reports = JSON.parse(localStorage.getItem("reports"));

  if (search_input == "") {
    show_experience_grid(6, -1);
  } else {
    var search_input_split = search_input.split(" ");
    var search_results = [];

    for (var exp of reports) {
      var temp_lower_array = [];
      if (!(exp.symptoms == undefined)){
      for (var t of exp.symptoms) {
        temp_lower_array.push(t.toLowerCase());
      }
      }
      if (
        temp_lower_array.includes(search_input.toLowerCase()) &&
        search_results.length < 6
      ) {
        search_results.push(exp);
      }
    }
    if (search_results.length < 9) {
      // if more than one keyword was searched
      for (var splt_word of search_input_split) {
        if (!(exp.symptoms == undefined)){
        for (var exp of reports) {
          var temp_lower_array = [];
          for (var t of exp.symptoms) {
            temp_lower_array.push(t.toLowerCase());
          }
          if (
            temp_lower_array.includes(splt_word.toLowerCase()) &&
            !search_results.includes(exp)
          ) {
            search_results.push(exp);
          }
        }}
      }
    }

    show_experience_grid(search_results.length, search_results);
  }
}

function faq_add() {
  firebase
    .database()
    .ref("FactCheck/")
    .push(document.getElementById("faq_input").value);
  document.getElementById("hideme").style.display = "none";
  document.getElementById("complete").innerHTML = "Thank you for submitting!";
}

function shuffle1(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

var SympReports = firebase.database().ref("Statistics/");
SympReports.once("value").then(function(snapshot) {
  localStorage.setItem("symp_reports", JSON.stringify(snapshot.val()));
});

function save_form() {
  
  var title = document.getElementById("title_input").value;
  var description = document.getElementById("description_input").value;

 if (title == "" && description == " "){
   
   alert("Title and description missing");
 } else if (title == "") {
    alert("Title missing");
  } else if (description == " ") {
    alert("Description missing");
  } else {
    document.getElementById("sub_hide").style.display = "none";
  document.getElementById("completesub").innerHTML =
    "Thank you for submitting! Visit <a href='experiences.html'>Experiences</a> or <a href='statistics.html'>Statistics</a> to see all of the data and stories!";

    
    var positive = document.getElementById("positive").checked;
    var symptoms = [];

    var symptoms_list = [
      "Fever",
      "Chills",
      "Cough",
      "Difficulty Breathing",
      "Fatigue",
      "Muscle or Body Aches",
      "Headache",
      "Loss of Taste or Smell",
      "Sore Throat",
      "Congestion or Runny Nose",
      "Nausea or Vomiting",
      "Diarrhea",
      "No Symptoms"
    ];
    var symptoms_id = [
      "s0",
      "s1",
      "s2",
      "s3",
      "s4",
      "s5",
      "s6",
      "s7",
      "s8",
      "s9",
      "s10",
      "s11",
      "s12"
    ];
    var symptoms_binary = [];

    if (positive) {
      var age = document.getElementById("age_input").value;

      var symptomdata = JSON.parse(localStorage.getItem("symp_reports"));



      for (let i = 0; i < symptoms_id.length; i++) {
        if (document.getElementById(symptoms_id[i]).checked) {
          // if checked off
          symptoms.push(symptoms_list[i]);
          symptoms_binary.push(1);

          var connectstat = firebase
            .database()
            .ref("Statistics/" + symptoms_list[i])
            .set({
              pos: parseFloat(symptomdata[symptoms_list[i]]["pos"]) + 1,
              neg: parseFloat(symptomdata[symptoms_list[i]]["neg"])
            });
        } else {
          symptoms_binary.push(0);

          var connectstats = firebase
            .database()
            .ref("Statistics/" + symptoms_list[i])
            .set({
              pos: parseFloat(symptomdata[symptoms_list[i]]["pos"]),
              neg: parseFloat(symptomdata[symptoms_list[i]]["neg"]) + 1
            });
        }
      }
    } else {
      var age = "";
    }

    var today = new Date();
    var timestamp =
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds() +
      " " +
      today.getDate() +
      "/" +
      today.getMonth() +
      "/" +
      today.getFullYear();

    var experience_report = {
      title: title,
      description: description,
      age: age,
      symptoms: symptoms,
      experience_id: experience_id,
      submissiontime: timestamp
    };

    var connectexperience = firebase
      .database()
      .ref("ExperienceReports/" + experience_id)
      .set(experience_report);
    console.log("exp report submitted");
  }
}
