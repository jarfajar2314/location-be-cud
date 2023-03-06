const amqp = require("amqplib/callback_api");

exports.send = (data, type) => {
	amqp.connect("amqp://localhost", function (error0, connection) {
		if (error0) {
			throw error0;
		}
		connection.createChannel(function (error1, channel) {
			if (error1) {
				throw error1;
			}

			var queue = "location-be";
			var msg = JSON.stringify({
				type: type,
				data: {
					...data,
				},
			});

			channel.assertQueue(queue, {
				durable: false,
			});
			channel.sendToQueue(queue, Buffer.from(msg));

			console.log(" [x] Sent %s", msg);
		});
		setTimeout(function () {
			connection.close();
		}, 500);
	});
};
