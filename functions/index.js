const functions = require("firebase-functions");
const express = require('express');
var cors = require('cors')
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert("./serviceAccount.json"),
  databaseURL: 'https://fbapi-ac1ee.firebaseio.com'
});

const app = express()

app.use(cors())

const db = admin.firestore()

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello world'})
})

// Movies
app.get('/api/movies', async (req, res) => {
  try{
    const query = await db.collection('movies').get()
    const docs = query.docs
    const response = docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description
    }))
    return res.status(200).json(response)
  }catch(e){
    return res.status(500).send(e)
  }
})

app.get('/api/movies/:id', async (req, res) => {
  try{
    const doc = db.collection('movies').doc(req.params.id)
    const item = await doc.get()
    const response = item.data()
    return res.status(200).json(response)
  }catch (e){
    return res.status(500).send(e)
  }
})

app.post('/api/movies', async (req, res) => {
  try{
    await db.collection('movies').add({ 
      name: req.body.name, 
      description: req.body.description 
    })
    return res.status(201).json()
  }catch(e){
    return res.status(500).send(e)
  }
})

app.put('/api/movies/:id', async (req,res) => {
  try {
    const doc = db.collection('movies').doc(req.params.id)
    await doc.update({ 
      name: req.body.name, 
      description: req.body.description 
    })
    return res.status(200).json()
  } catch (e){
    return res.status(500).send(e)
  }
})

app.delete('/api/movies/:id', async (req,res) => {
  try {
    const doc = db.collection('movies').doc(req.params.id)
    await doc.delete()
    return res.status(200).json()
  } catch (e) {
    return res.status(500).send(e)
  }
})

// Categories
app.get('/api/categories', async (req, res) => {
  try{
    const query = await db.collection('categories').get()
    const docs = query.docs
    const response = docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description
    }))
    return res.status(200).json(response)
  }catch(e){
    return res.status(500).send(e)
  }
})

app.get('/api/categories/:id', async (req, res) => {
  try{
    const doc = db.collection('categories').doc(req.params.id)
    const item = await doc.get()
    const response = item.data()
    return res.status(200).json(response)
  }catch (e){
    return res.status(500).send(e)
  }
})

app.post('/api/categories', async (req, res) => {
  try{
    await db.collection('categories').add({ 
      name: req.body.name, 
      description: req.body.description 
    })
    return res.status(201).json()
  }catch(e){
    return res.status(500).send(e)
  }
})

app.put('/api/categories/:id', async (req,res) => {
  try {
    const doc = db.collection('categories').doc(req.params.id)
    await doc.update({ 
      name: req.body.name, 
      description: req.body.description 
    })
    return res.status(200).json()
  } catch (e){
    return res.status(500).send(e)
  }
})

app.delete('/api/categories/:id', async (req,res) => {
  try {
    const doc = db.collection('categories').doc(req.params.id)
    await doc.delete()
    return res.status(200).json()
  } catch (e) {
    return res.status(500).send(e)
  }
})

// Studios
app.get('/api/studios', async (req, res) => {
  try{
    const query = await db.collection('studios').get()
    const docs = query.docs
    const response = docs.map(doc => ({
      id: doc.id,
      name: doc.data().name,
      description: doc.data().description
    }))
    return res.status(200).json(response)
  }catch(e){
    return res.status(500).send(e)
  }
})

app.get('/api/studios/:id', async (req, res) => {
  try{
    const doc = db.collection('studios').doc(req.params.id)
    const item = await doc.get()
    const response = item.data()
    return res.status(200).json(response)
  }catch (e){
    return res.status(500).send(e)
  }
})

app.post('/api/studios', async (req, res) => {
  try{
    await db.collection('studios').add({ 
      name: req.body.name, 
      description: req.body.description 
    })
    return res.status(201).json()
  }catch(e){
    return res.status(500).send(e)
  }
})

app.put('/api/studios/:id', async (req,res) => {
  try {
    const doc = db.collection('studios').doc(req.params.id)
    await doc.update({ 
      name: req.body.name, 
      description: req.body.description 
    })
    return res.status(200).json()
  } catch (e){
    return res.status(500).send(e)
  }
})

app.delete('/api/studios/:id', async (req,res) => {
  try {
    const doc = db.collection('studios').doc(req.params.id)
    await doc.delete()
    return res.status(200).json()
  } catch (e) {
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
