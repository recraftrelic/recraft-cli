export interface Command {
  name: string;
  methodToCall: (args: object) => void
}