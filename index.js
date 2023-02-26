const express = require("express");
const WebSocket = require("ws");
const http = require("http");
const uuid = require("uuid");
const fs = require("fs");

const initPulsarClient = require("./pulsarClient");

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use("/static", express.static(__dirname + "/public"));

app.get("/data", (req, res) => {
	fs.readFile("./messages.json", (err, json) => {
		if (err) {
			console.log(err);
			return res.status(500).send("Error reading file");
		}

		const obj = JSON.parse(json);
		return res.json(obj);
	});
});

wss.on("connection", (ws) => {
	// Send initial events to new client
	const messages = JSON.parse(fs.readFileSync("messages.json"));
	ws.send(JSON.stringify({ type: "INITIAL_EVENTS", data: messages }));

	// Handle new events from clients
	ws.on("message", (message) => {
		const newEvent = JSON.parse(message);
		newEvent.event_id = uuid.v4();
		events.push(newEvent);

		// Broadcast new event to all clients
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(
					JSON.stringify({ type: "NEW_EVENT", data: newEvent })
				);
			}
		});
	});
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});

server.listen(3001, () => {
	console.log("Socket server running on port 3001");
});

initPulsarClient(wss);
