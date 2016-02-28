import Observable from '../../src/Simulation/Observable.js';

describe("Test observer", function() {

    it('Test it lets observe and notifies', ()=>{
        var observer = {notify: () => {} };
        spyOn(observer, 'notify');

        var observable = new Observable();
        observable.registerObserver(observer);
        observable.notifyAll();

        expect(observer.notify).toHaveBeenCalled();
    });

    it('Test it lets unregister from being notified', ()=>{
        var observer = {notify: () => {} };
        spyOn(observer, 'notify');

        var observable = new Observable();
        observable.registerObserver(observer);
        observable.unregisterObserver(observer);
        observable.notifyAll();

        expect(observer.notify).not.toHaveBeenCalled();
    });
});
