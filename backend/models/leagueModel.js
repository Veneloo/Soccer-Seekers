const mongoose = require('mongoose')

const Schema = mongoose.Schema

const leagueSchema = new Schema({
    id: Number,
    name: String,
    country: String,
    season: Number,
    isCurrentSeason: {type: Boolean, default: false}
    
})

module.exports = mongoose.model('Leagues', leagueSchema)