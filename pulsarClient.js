const Pulsar = require("pulsar-client");
const fs = require("fs");
const WebSocket = require("ws");

const initPulsarClient = async (wss) => {
  const serviceUrl =
    "pulsar+ssl://pulsar-aws-useast1.streaming.datastax.com:6651";
  const pulsarToken = "some-token";

  const tenantName = "some-tenant";
  const namespace = "some-namespace";
  const topicName = "some-topic";

  const topic = `persistent://${tenantName}/${namespace}/${topicName}`;

  const trustStore = "/etc/ssl/certs/ca-certificates.crt";

  try {
    const auth = new Pulsar.AuthenticationToken({ token: pulsarToken });
    console.log("created auth");

    const client = new Pulsar.Client({
      serviceUrl: serviceUrl,
      authentication: auth,
      tlsTrustCertsFilePath: trustStore,
      operationTimeoutSeconds: 30,
    });
    console.log("created client");

    const consumer = await client.subscribe({
      topic: topic,
      subscription: "examples-subscription",
      subscriptionType: "Exclusive",
      ackTimeoutMs: 10000,
    });
    console.log("created consumer");

    try {
      // create messages.json file and add an empty array to it; overwrite if it already exists
      fs.writeFile("messages.json", JSON.stringify([]), (err) => {
        if (err) {
          console.error(err);
        }
      });

      while (true) {
        console.log("\nwaiting for message");
        const msg = await consumer.receive();
        console.log(msg.getData().toString());

        consumer.acknowledge(msg);
        console.log("received message");

        // append message to array in messages.json file synchronously
        const messages = JSON.parse(fs.readFileSync("messages.json"));
        messages.push(JSON.parse(msg.getData().toString()));
        fs.writeFileSync("messages.json", JSON.stringify(messages));

        // broadcast new event to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "DATA_UPDATE",
                data: messages,
              })
            );
          }
        });
      }
    } catch (err) {
      console.error(err);

      await consumer?.close();
      console.log("closed consumer");

      await client?.close();
      console.log("closed client");
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = initPulsarClient;
