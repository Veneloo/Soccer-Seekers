require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const leaguesRoutes = require('./routes/leagueroutes')

//express app
const SoccerLeague = express()

//middleware
SoccerLeague.use(express.json())

SoccerLeague.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
SoccerLeague.use('/leagues', leaguesRoutes)

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
