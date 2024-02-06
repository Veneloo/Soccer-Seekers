const express = require('express')
const router = express.Router()
const axios = require('axios')

// Route to get soccer league data
router.get('/soccer-leagues', async (req, res) => {
    try {
        const response = await axios.get('https://api-football-v1.p.rapidapi.com/v3/leagues', {
            headers: {
                'x-rapidapi-key': process.env.API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching soccer league data:', error);
        res.status(500).send('Server error');
    }
});
//GET a single league
router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single league'})
})

//POST a new league
router.post('/', (req, res) => {
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