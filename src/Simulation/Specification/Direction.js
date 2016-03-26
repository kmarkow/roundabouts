class Direction {
    static allDirections() {
        return Array.from(["N", "S", "E", "W"], directionId => {
            return new Direction(directionId);
        });
    }

    constructor(direction) {
        this._direction = direction;
    }

    id() {
        return this._direction;
    }

    static newNorth() {
        return new Direction("N");
    }

    static newSouth() {
        return new Direction("S");
    }

    static newEast() {
        return new Direction("E");
    }

    static newWest() {
        return new Direction("W");
    }
}

export default Direction;
