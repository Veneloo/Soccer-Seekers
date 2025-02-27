require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./firebase-admin-key.json');

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Soccer Seekers API is running!');
});


// Fetch player profile from API Football
app.get('/api/players/:id', async (req, res) => {
  const playerId = req.params.id;
  const seasonId = req.query.season;
  const leagueId = req.query.league;

  const options = {
    method: 'GET',
    url: 'https://api-football-v1.p.rapidapi.com/v3/players', // Updated API endpoint
    params: {
      id: playerId,
      season: seasonId,
      league: leagueId,
    },
    headers: {
      'x-rapidapi-key': process.env.FOOTBALL_API_KEY, // Use environment variable
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com', // Updated API host
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch player data' });
  }
});

// Save player to favorites
app.post('/api/favorites', async (req, res) => {
  const { userId, playerId } = req.body;

  try {
    await admin.firestore().collection('users').doc(userId).collection('favorites').doc(playerId).set({
      playerId,
      timestamp: new Date(),
    });
    res.json({ message: 'Player added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

// Get user favorites
app.get('/api/favorites/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const snapshot = await admin.firestore().collection('users').doc(userId).collection('favorites').get();
    const favorites = snapshot.docs.map((doc) => doc.data());
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));