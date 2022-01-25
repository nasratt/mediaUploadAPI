const firebaseAdmin = require('firebase-admin');
require('dotenv').config();

const serviceAccount = require('./../../gcpAuth.json');

const fbApp = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

const BUCKET = process.env.FB_STORAGE_BUCKET;

const storageRef = fbApp.storage().bucket(BUCKET);
storageRef.makePublic({ includeFiles: true, force: true });

module.exports = storageRef;
