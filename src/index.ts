
import express from 'express';
import * as admin from 'firebase-admin';
import path from 'path';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://thedasheplur.firebaseio.com'
});

const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/hello', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
