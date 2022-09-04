const amqp = require("amqplib");
async function fanoutExchangeConsumer(){
    try{
        const rabbitmqUrl = "amqp://mint:5672";
        const connection = await amqp.connect(rabbitmqUrl);
        const exchange = "transports";
        const exchangeType = "fanout";
        const routingKey = "";
        const options = {};
        const queueName="aaa";
        let channel = await connection.createChannel();
        await channel.assertExchange(exchange, exchangeType, options);
        const { queue } = await channel.assertQueue(queueName, options);
        channel.bindQueue(queue, exchange, routingKey);
        channel.consume(queue, (data) => {
            console.log("Received", JSON.parse(data.content.toString()));
            channel.ack(data, false, true);
        });
    }catch(error){
        console.error(error)
    }
}
fanoutExchangeConsumer()