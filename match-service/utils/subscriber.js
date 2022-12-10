const amqp = require('amqplib');

const { Match } = require('../models/models');

async function subscriber() {
  const connection = await amqp.connect(process.env.AMQP_URL);
  const channel = await connection.createChannel();

  await channel.assertExchange(process.env.EXCHANGE_NAME, 'direct', {
    durable: true,
  });
  const q = await channel.assertQueue('', { exclusive: true });
  console.log(`waiting for message ${q.queue}`);
  channel.bindQueue(
    q.queue,
    process.env.EXCHANGE_NAME,
    process.env.BINDING_KEY_TICKET_SELL
  );

  channel.consume(
    q.queue,
    async msg => {
      if (msg.content) {
        const payload = msg.content.toString();
        const data = JSON.parse(payload);
        const getMatch = await Match.findOne({ _id: data.matchId });
        getMatch.totalTickets--;
        getMatch.save();
      }
    },
    {
      noAck: true,
    }
  );
}

module.exports = subscriber;
