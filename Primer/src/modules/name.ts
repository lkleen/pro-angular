export class Name {
  constructor(public first: string, public last: string) {
  }

  createString () : string {
    return `first: ${this.first} last: ${this.last}`;
  }

  print () {
    console.log(this.createString ());
  }
}
