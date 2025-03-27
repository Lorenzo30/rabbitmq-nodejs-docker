const amqp = require("amqplib")

async function  receiveEmail(params) {

    try {

        const connection = await amqp.connect({
            protocol: "amqp",
            hostname: "localhost",
            port: 5673,
            username: "user",
            password: "password",
          });
        
        const channel = await connection.createChannel() 
        await channel.assertQueue("mail_queue");
       

        channel.consume("mail_queue",(message) => {
            if (message != null) {
                console.log(JSON.parse(message.content))
                channel.ack(message);
            }
        })

    } catch (e) {
        console.log(e);
    }
   

}


receiveEmail();