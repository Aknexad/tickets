const amqp = require('amqplib');

async function emitLogs(payload, event) {
  const connection = await amqp.connect(process.env.AMQP_URL);
  const channel = await connection.createChannel();
  await channel.assertExchange(process.env.EXCHANGE_NAME, 'direct', {
    durable: true,
  });
  channel.publish(
    process.env.EXCHANGE_NAME,
    process.env.BINDING_KEY,
    Buffer.from(JSON.stringify(payload))
  );
  console.log(`send to user service`);

  channel.publish(
    process.env.EXCHANGE_NAME,
    process.env.BINDING_KEY_TICKET_SELL,
    Buffer.from(JSON.stringify(event))
  );
  console.log(`send to match service`);
}

module.exports = emitLogs;
