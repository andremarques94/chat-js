export function setupSocket() {
  const connection = new WebSocket("ws://localhost:8088");

  function waitForMessage() {
    return new Promise((resolve, reject) => {
      connection.addEventListener("message", (event) => {
        resolve(event.data);
      });
    });
  }

  function sendMsg(msg) {
    connection.send(msg);
  }

  function isConnectionAlive() {
    return connection.readyState === WebSocket.OPEN;
  }

  return { waitForMessage, sendMsg, isConnectionAlive };
}
