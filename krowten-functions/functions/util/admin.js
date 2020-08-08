const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore(); //reference to the database

module.exports = { admin, db };
