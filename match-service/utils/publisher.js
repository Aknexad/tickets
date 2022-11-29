const amqp = require('amqplib');

async function emitLogs(payload) {
  const exchange = 'logs';
  const msg = payload;
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  await channel.assertExchange(exchange, 'direct', { durable: true });
  channel.publish(exchange, '', Buffer.from(JSON.stringify(msg)));
  console.log(`send ${msg}`);
  // setTimeout(() => {
  //   connection.close();
  //   process.exit(0);
  // }, 500);
}

module.exports = emitLogs;
