const amqp = require('amqplib');

async function emitLogs(payload) {
  const exchange = 'logs';
  const msg = payload;
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(process.env.EXCHANGE_NAME, 'direct', {
    durable: true,
  });
  channel.publish(
    process.env.EXCHANGE_NAME,
    process.env.BINDING_KEY,
    Buffer.from(JSON.stringify(msg))
  );
  console.log(`send ${msg}`);
}

module.exports = emitLogs;
