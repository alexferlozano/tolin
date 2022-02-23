const functions = require("firebase-functions");
const express = require('express');
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccount.json"),
  databaseURL: 'https://fbapi-ac1ee.firebaseio.com'
});

const app = express()

const db = admin.firestore()

app.get('/hello-world', (req, res) => {
  return res.status(200).json({ message: 'Hello world'})
})

app.post('/api/movies', async (req, res) => {
  await db.collection('movies').doc('/'+ req.body.id + '/').create({ name: req.body.name });
  return res.json();
})

app.get('/api/movies/:id', async (req, res) => {
  try {
    const doc = db.collection('movies').doc(req.params.id)
    const item = await doc.get()
    const response = item.data()
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }
})

app.delete('/api/movies/:id', async (req,res) => {
  try {
    const doc = db.collection('movies').doc(req.params.id)
    await doc.delete()
    return res.json()
  } catch (e) {
    return res.status(500).send(e)
  }
})

app.put('/api/movies/:id', async (req,res) => {
  try {
    const doc = db.collection('movies').doc(req.params.id)
    await doc.update({name: req.body.name})
    return res.json()
  } catch (e){
    return res.status(500).send(e)
  }
})

app.post('/api/categories', async (req, res) => {
  await db.collection('categories').doc('/'+ req.body.id + '/').create({ name: req.body.name , description: req.body.description});
  return res.json();
})

app.get('/api/categories/:id', async (req, res) => {
  try {
    const doc = db.collection('categories').doc(req.params.id)
    const item = await doc.get()
    const response = item.data()
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }
})

app.delete('/api/categories/:id', async (req,res) => {
  try {
    const doc = db.collection('categories').doc(req.params.id)
    await doc.delete()
    return res.json()
  } catch (e) {
    return res.status(500).send(e)
  }
})

app.put('/api/categories/:id', async (req,res) => {
  try {
    const doc = db.collection('categories').doc(req.params.id)
    await doc.update({name: req.body.name, description: req.body.description})
    return res.json()
  } catch (e){
    return res.status(500).send(e)
  }
})


app.post('/api/studios', async (req, res) => {
  await db.collection('studios').doc('/'+ req.body.id + '/').create({ name: req.body.name , description: req.body.description});
  return res.json();
})

app.get('/api/studios/:id', async (req, res) => {
  try {
    const doc = db.collection('studios').doc(req.params.id)
    const item = await doc.get()
    const response = item.data()
    return res.status(200).json(response)
  } catch (e) {
    console.log(e)
    return res.status(500).send(e)
  }
})

app.delete('/api/studios/:id', async (req,res) => {
  try {
    const doc = db.collection('studios').doc(req.params.id)
    await doc.delete()
    return res.json()
  } catch (e) {
    return res.status(500).send(e)
  }
})

app.put('/api/studios/:id', async (req,res) => {
  try {
    const doc = db.collection('studios').doc(req.params.id)
    await doc.update({name: req.body.name, description: req.body.description})
    return res.json()
  } catch (e){
    return res.status(500).send(e)
  }
})


exports.app = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
