interface Command {
  name: string;
  methodToCall: (args: object) => void
}

module.exports = {
  Command
}
