const express = require('express')
const router = express.Router()
const axios = require('axios')
const Leagues = require('../models/leagueModel')






router.get('/league-display', async (req, res) => {
    const sort = req.query.sort; // Correctly extract the 'sort' query parameter
    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/leagues',
        params: {current: 'true'},
        headers: {
            'X-RapidAPI-Key': process.env.API_KEY,
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        let leagues = response.data.response.map(league => ({
            name: league.league.name,
            country: league.country.name,
        }));

        // Sort based on query parameter
        if (sort === 'country') {
            leagues.sort((a, b) => a.country.localeCompare(b.country) || a.name.localeCompare(b.name));
        } else { // Default to alphabetical sort by name
            leagues.sort((a, b) => a.name.localeCompare(b.name));
        }

        res.json(leagues);
    } catch (error) {
        console.error('Error fetching soccer leagues:', error);
        res.status(500).send('Server error');
    }
});



//GET a single league
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single league'})
})

//POST a new league
router.post('/', (req, res) => {
    const {id, name, country, season} = req.body
    res.json({mssg: 'POST a new league'})
})


//DELETE a league
router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELTE a league'})
})

//UPDATE a league
router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a new league'})
})



module.exports = router