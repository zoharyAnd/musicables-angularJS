# Musicables

Musicables is an online music library for listening and searching music contents.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

First you will need to install **NodeJs** , **npm** on your computer.
Before starting the project: 
* Subscribe to [Firebase](https://firebase.google.com/) and add a project to your console to store our user data.
* Subscribe to [Napster API](https://developer.napster.com/api/v2.2#overview) to get an API key for your application
    </br> Replace the NapsterApiKey in each call within the project with your newly Api key
    
Run
```
npm install
```

Include Firebase in your application add the following scripts to the bottom of your <body> tag


```
<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
  <script src="/__/firebase/7.8.0/firebase-app.js"></script>

  <!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
  <script src="/__/firebase/7.8.0/firebase-analytics.js"></script>

  <!-- Add Firebase products that you want to use -->
  <script src="/__/firebase/7.8.0/firebase-auth.js"></script>
  <script src="/__/firebase/7.8.0/firebase-firestore.js"></script>
  
  <!-- Initialize Firebase -->
  <script src="/__/firebase/init.js"></script>
```

Make sure to update your Firebase config object in your app
```
var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};
```

In your console run:
```
firebase init
```

### Installing

To get a development env running execute:

```
npm start
```

## This portfolio was Built With

* [AngularJs](https://angularjs.org/)
* [Napster API](https://developer.napster.com/api/v2.2#overview) - As a source to fetch all the data
* [CreateJS](https://createjs.com/getting-started/soundjsf) - For listening to the media directly
* [Firebase](https://firebase.google.com/) 
* [Gulp](https://gulpjs.com/) 

## Author

**Zohary Andrianome**
