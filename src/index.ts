
import express from 'express';
import * as admin from 'firebase-admin';
import path from 'path';
import ingestionRoutes from './ingestion/routes/ingestionRoutes';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://thedasheplur.firebaseio.com'
});

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Mount the ingestion routes
app.use('/ingest', ingestionRoutes);

app.get('/api/hello', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
