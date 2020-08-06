const functions = require("firebase-functions");
const admin = require("firebase-admin");
const app = require("express")();

admin.initializeApp();

const config = {
  apiKey: "AIzaSyBQ7l9bIrBnDzjrd6gZQbkTy47de-aI6D8",
  authDomain: "krowten-ffb6f.firebaseapp.com",
  databaseURL: "https://krowten-ffb6f.firebaseio.com",
  projectId: "krowten-ffb6f",
  storageBucket: "krowten-ffb6f.appspot.com",
  messagingSenderId: "687722603762",
  appId: "1:687722603762:web:1d64e90e8f613e9f2b1c6b",
  measurementId: "G-RCJYWSPT5S",
};

const firebase = require("firebase");
firebase.initializeApp(config);
const db = admin.firestore(); //reference to the database

//get screams
app.get("/screams", (req, res) => {
  db.collection("screams")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let screams = [];
      data.forEach((doc) => {
        screams.push({
          screamId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(screams);
    })
    .catch((err) => console.error(err));
});

//post scream
app.post("/scream", (req, res) => {
  const newScream = {
    body: req.body.body,
    //First body is the body of the request, second body is the property of that
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  db.collection("screams")
    .add(newScream)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.error(err);
      console.log(newScream);
    });
});

//helper function to check if a string is empty
const isEmpty = (str) => {
  if (str.trim() === "") return true;
  else return false;
};

//helper function to check if email is valid
const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.match(regEx)) return true;
  else return false;
};

//signup route
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  //validation
  let errors = {};
  if (isEmpty(newUser.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(newUser.email)) {
    errors.email = "Must be a valid email address";
  }
  if (isEmpty(newUser.password)) errors.password = "Must not be empty";
  if (newUser.password !== newUser.confirmPassword)
    errors.confirmPasswords = "Passwords must match";
  if (isEmpty(newUser.handle)) errors.password = "Must not be empty";
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      //Firebase returns a doc snapshot anyway, so we need to check if the user exists
      if (doc.exists) {
        //bad request 400: handle exists already
        return res.status(400).json({ handle: "this handle is already taken" });
      } else {
        //create user
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      //get authentication token
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      //create user document
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString,
        userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      //server error
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use" });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
});

//login route
app.post("/login", (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  //validation
  let errors = {};
  if (isEmpty(user.email)) errors.email = "Must not be empty";
  if (isEmpty(user.password)) errors.password = "Must not be empty";
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/wrong-password") {
        return res
          .status(403)
          .json({ general: "Wrong credentials, please try again" });
      } else return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.region("asia-east2").https.onRequest(app);
