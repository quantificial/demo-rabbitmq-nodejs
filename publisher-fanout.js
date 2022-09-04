const amqp = require("amqplib");
async function fanoutExchange(){
    try{
        const rabbitmqUrl = "amqp://mint:5672";
        const connection = await amqp.connect(rabbitmqUrl);
        const exchange = "transports";
        const exchangeType = "fanout";
        const routingKey = "";
        const options = {};
        const payload = {
            vehicleType: "car",
            numberOfPassenger: 3,
        };
        let channel = await connection.createChannel();
        await channel.assertExchange(exchange, exchangeType, options);
        channel.publish(
            exchange,
            routingKey,
            Buffer.from(JSON.stringify(payload)),
            options
        );
    }catch(error){
        console.error(error)
    }
}
fanoutExchange()