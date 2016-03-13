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
}

export default Direction;
