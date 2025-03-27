const amqp = require("amqplib")

async function sendEmail() {
    try {
        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: "localhost",
            port: 5673,
            username: "user",
            password: "password",
          });


          connection.on("error", (error) => {
            console.error("Connection error : ", config, error);
        });

        const channel = await connection.createChannel()
        const exchange = "mail_exchange"
        const routingKey = "send_email"

        const message = {
            to:"lorenzocorrea33333.ge@gmail.com",
            from:"wcojcwocw2@gmail.com",
            subject:"LOLO2",
            body:"Lorenzo owjcwocwjcwo"
        }

        await channel.assertExchange(exchange,"direct",{durable:false})
        await channel.assertQueue("mail_queue");

        await channel.bindQueue("mail_queue",exchange,routingKey)

        channel.publish(exchange,routingKey,Buffer.from(JSON.stringify(message)))

        setTimeout(() => {
            channel.close();
        },500)
    } catch (e) {
        console.log(e);
    }
}

sendEmail();