export { Ship };

class Ship {
  constructor(length, rotation = "horizontal") {
    this.length = length;
    this.rotation = rotation;
    this.hits = 0;
    this.hasSunk = false;
  }

  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}
