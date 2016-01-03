class HelloWorld {
    sayHi() {
        console.log("Hi there");
        // Make an instance of two and place it on the page.
        var two = new Two({
            fullscreen: true,
            autostart: true
        }).appendTo(document.body);
        var rect = two.makeRectangle(two.width / 2, two.height / 2, 50 ,50);
        two.bind('update', function() {
            rect.rotation += 0.001;
        });
    }
}
var hello = new HelloWorld();
hello.sayHi();

