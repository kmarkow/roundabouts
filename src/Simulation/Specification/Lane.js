class Lane {
    constructor(id, length, width, isRounded) {
        this._id = id;
        this._length = length;
        this._width = width;
        this._isRounded = isRounded;
    }

    id() {
        return this._id;
    }

    length() {
        return this._length;
    }

    isRounded() {
        return this._isRounded;
    }

    width() {
        return this._width;
    }

    isExit() {
        return this._id.indexOf('EXIT') != -1;
    }
}

export default Lane;
