
class Observable {

    constructor() {
        this._observers = [];
    }

    registerObserver(observer) {
        this._observers.push(observer);
    }

    unregisterObserver(observer) {
        this._observers.splice(this._observers.indexOf(observer), 1);
    }

    notifyAll() {
        this._observers.forEach(observer => {
           observer.notify();
        });
    }
}

export default Observable;
