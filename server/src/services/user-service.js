import { User } from "../model/user.js";

export function userService() {
  let users = [];

  return {
    getUser: function (clientSocket) {
      return users.find((user) => user.getSocket() === clientSocket);
    },
    addUser: function (clientSocket) {
      const user = new User(clientSocket);
      users.push(user);
    },
    disconnectUser: function (disconnectedUser) {
      const msg = `${disconnectedUser.getName()} has disconnected\n`;

      console.log(msg);

      users = users.filter((user) => user !== disconnectedUser);

      users.forEach((user) => {
        user.send(msg);
      });
    },
    broadcast: function (data, sender) {
      users.forEach((user) => {
        if (user !== sender) {
          user.send(`${sender.getName()}: ${data}`);
        }
      });
    },
  };
}
