const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const serviceAccount = require(`${__dirname}/aindi-serv.json`);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = { db };
