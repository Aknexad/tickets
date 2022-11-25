const mongoose = require('mongoose');

const schema = mongoose.Schema;

const TicketListSchema = new schema({
  userId: {
    type: String,
    required: true,
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
  },
});

const TicketList = mongoose.model('TicketList', TicketListSchema);

module.exports = TicketList;
