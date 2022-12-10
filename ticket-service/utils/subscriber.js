const amqp = require('amqplib');

async function subscriber() {
  const exchange = 'logs';
  const connection = await amqp.connect(process.env.AMQP_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, 'direct', { durable: true });
  const q = await channel.assertQueue('', { exclusive: true });
  console.log(`waiting for message ${q.queue}`);
  channel.bindQueue(q.queue, exchange, '');

  channel.consume(
    q.queue,
    msg => {
      if (msg.content) {
        const payload = msg.content.toString();

        console.log(payload);
      }
    },
    {
      noAck: true,
    }
  );
}

module.exports = subscriber;
