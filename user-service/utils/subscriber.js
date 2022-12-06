const amqp = require('amqplib');

const userModels = require('../models/models');

async function subscriber(userId) {
  const exchange = 'logs';
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, 'direct', { durable: true });
  const q = await channel.assertQueue('', { exclusive: true });
  console.log(`waiting for message ${q.queue}`);
  channel.bindQueue(q.queue, exchange, '');

  channel.consume(
    q.queue,
    async msg => {
      if (msg.content) {
        const payload = msg.content.toString();
        const user = await userModels.findOne({ _id: userId });
        user.tickets.push(JSON.parse(payload));
        user.save();
        console.log(payload);
      }
    },
    {
      noAck: true,
    }
  );
}

module.exports = subscriber;
