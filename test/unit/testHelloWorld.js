import HelloWorld from '../../src/app.js';

describe("Unit testing ES6", function() {

    let hello;

    beforeEach(()=>{
       hello = new HelloWorld();
    });

    it('Should return welcome message', ()=>{
        expect(hello.sayHi()).toEqual('Hello');
    });
});
