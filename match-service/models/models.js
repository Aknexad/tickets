const mongoose = require('mongoose');

const schema = mongoose.Schema;

const MatchSchema = new schema({
  matchType: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  visitor: {
    type: String,
    required: true,
  },
  stadium: {
    type: String,
    required: true,
  },
  dateAndTime: {
    type: Date,
    default: Date.now(),
  },
  author: { type: String, required: true },
  totalTickets: Number,
  remainingTickets: Number,
});

const TeamSchema = new schema({
  name: {
    type: String,
    required: true,
  },
});

const LocationSchema = new schema({
  name: {
    type: String,
    required: true,
  },
});

const StadiumSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const Match = mongoose.model('Match', MatchSchema);
const Team = mongoose.model('Team', TeamSchema);
const Location = mongoose.model('Locarion', LocationSchema);
const Stadium = mongoose.model('Stadium', StadiumSchema);

module.exports = { Match, Team, Location, Stadium };
