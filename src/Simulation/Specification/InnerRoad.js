class InnerRoad {
    constructor(lanes) {
        this._lanes = lanes;
    }

    allLanes() {
        return this._lanes;
    }

    lanesCount() {
        return this._lanes.length;
    }
}

export default InnerRoad;
