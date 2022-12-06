const amqp = require('amqplib');

const userModels = require('../models/models');

async function subscriber() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  await channel.assertExchange(process.env.EXCHANGE_NAME, 'direct', {
    durable: true,
  });
  const q = await channel.assertQueue('', { exclusive: true });
  console.log(`waiting for message ${q.queue}`);
  channel.bindQueue(
    q.queue,
    process.env.EXCHANGE_NAME,
    process.env.BINDING_KEY
  );

  channel.consume(
    q.queue,
    async msg => {
      if (msg.content) {
        const payload = msg.content.toString();
        const data = JSON.parse(payload);
        const user = await userModels.findOne({ _id: data.userId });
        user.tickets.push(data);
        user.save();
        console.log('send to user service');
      }
    },
    {
      noAck: true,
    }
  );
}

module.exports = subscriber;
