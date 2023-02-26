try {
  const socket = new WebSocket("ws://localhost:3001");

  socket.addEventListener("open", function (event) {
    console.log("WebSocket connection established");
  });

  socket.addEventListener("message", function (event) {
    const data = JSON.parse(event.data);
    console.log("Received event:", data);

    // handle incoming event
    updateCharts(data.data);

    // set #timestamp to the current time
    document.getElementById("timestamp").innerHTML =
      new Date().toLocaleTimeString();
  });

  socket.addEventListener("close", function (event) {
    console.log("WebSocket connection closed");
  });

  socket.addEventListener("error", function (event) {
    console.error("WebSocket error:", event);
  });
} catch (err) {
  console.error(err);
}
