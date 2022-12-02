const mongoose = require('mongoose');

const schema = mongoose.Schema;

const TeamSchema = new schema({
  name: {
    type: String,
    required: true,
  },
});

const MatchTypeSchema = new schema({
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
  stadium: [{ type: Object, ref: StadiumSchema }],
  dateAndTime: {
    type: Date,
    default: Date.now(),
  },
  author: { type: String, required: true },
  totalTickets: Number,
  remainingTickets: Number,
});
const Match = mongoose.model('Match', MatchSchema);
const Team = mongoose.model('Team', TeamSchema);
const MatchType = mongoose.model('MatchType', MatchTypeSchema);
const Stadium = mongoose.model('Stadium', StadiumSchema);

module.exports = { Match, Team, Stadium, MatchType };
