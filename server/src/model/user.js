class User {
  _name = null;

  constructor(socket) {
    this.socket = socket;
  }

  getName() {
    return this._name;
  }

  getSocket() {
    return this.socket;
  }

  setName(name) {
    this._name = name;
  }

  send(data) {
    this.socket.send(data);
  }
}

export { User };
