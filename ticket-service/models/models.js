const mongoose = require('mongoose');

const schema = mongoose.Schema;

const TicketListSchema = new schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    require: true,
  },

  matchId: {
    type: String,
    required: true,
  },
  ticketStatus: {
    type: Boolean,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 20,
  },
});

const TicketList = mongoose.model('TicketList', TicketListSchema);

module.exports = TicketList;
