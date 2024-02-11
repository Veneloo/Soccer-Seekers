require('dotenv').config()
const cors = require('cors');
const express = require('express')
const mongoose = require('mongoose')
const leaguesRoutes = require('./routes/leagueroutes')

//express app
const SoccerLeague = express()
SoccerLeague.use(cors());

//middleware
SoccerLeague.use(express.static('public'))
SoccerLeague.use(express.json())

SoccerLeague.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


// Welcome route
SoccerLeague.get('/', (req, res) => {
    res.send('Welcome to the Soccer League App!');
  });


//routes
SoccerLeague.use('/welcome', leaguesRoutes)

//Connect to DB
mongoose.connect(process.env.MONGO_URIs)
    .then(() => {
        //listen for requests
        SoccerLeague.listen(process.env.PORT, () =>{
            console.log('connected to db and listening on port', process.env.PORT)
        })       
    })
    .catch((error) => {
        console.error(error)
    })
