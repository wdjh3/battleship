export { Ship };

class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.hasSunk = false;
  }

  hit() {
    this.hits += 1;
    this.hasSunk = this.isSunk();
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
