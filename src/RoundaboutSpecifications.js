class RoundaboutSpecification {
    constructor(lanesWidth, islandRadius) {
        this.lanesWidth = lanesWidth;
        this.islandRadius = islandRadius;
    }

    roundaboutDiameter() {
        let islandDiameter = 2 * this.islandRadius;
        let lanesWidth = this.lanesWidth.reduce(function(previousValue, currentValue) {
            return previousValue + currentValue;
        });
        return islandDiameter + lanesWidth * 2;
    }

    lanesCount() {
        return this.lanesWidth.length;
    }
}

var roundaboutBukowe = new RoundaboutSpecification([4.5, 4.5], 56/2);

export {roundaboutBukowe};
