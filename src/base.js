class List {
  constructor(items = []) {
    this.floors = items.map(item => new this.floor(item));
  }
}
  module.exports = List;  