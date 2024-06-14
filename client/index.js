import { setupSocket } from "./connection/socket.js";

const { waitForMessage, sendMsg, isConnectionAlive } = setupSocket();

function setUpButton() {
  const button = document.createElement("button");
  button.textContent = "Send";
  document.querySelector("#form").appendChild(button);
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const input = document.querySelector("#input");
    sendMsg(input.value);

    const username = document.querySelector("#username");
    username
      ? displayMessage(username.textContent + ": " + input.value)
      : displayName(input.value);

    input.value = "";
  });
}

function displayName(name) {
  const title = document.querySelector("#header");
  const username = document.createElement("h6");
  username.id = "username";
  username.textContent = `${name}`;
  title.appendChild(username);
}

function displayMessage(message) {
  const li = document.createElement("li");
  li.textContent = message;
  document.querySelector("#messages").appendChild(li);
}

async function listenForMessages() {
  while (isConnectionAlive) {
    const message = await waitForMessage();
    displayMessage(message);
  }
}

setUpButton();
listenForMessages();
