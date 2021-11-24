"use strict";
// -- [Aufgabe 1]
var Scriptvorlage;
(function (Scriptvorlage) {
    window.addEventListener("load", init);
    function init(_event) {
        /**
         * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
         */
        let age = 20;
        /**
         * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
         */
        let firstName = `Ben`;
        function func1(age) {
            return 2021 - age;
        }
        let output = func2(firstName);
        function func3(meal) {
            console.log(`Ich esse gerne ${meal || "Pizza"}.`);
            return func1(age) > 1995
                ? `Ich gehöre zur Generation Z`
                : `Ich gehöre zur Generation Y`;
        }
        console.log(output);
        function func2(name) {
            console.log(`Ich heiße ${name}.`);
            return func3();
        }
        /* -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 1 EINTRAGEN
        * Ich heiße Ben
        * Ich esse gerne Pizza
        * Ich gehöre zur Generation Z
      
        */
        // -- [Aufgabe 2]
        let events = [
            ["Mark Knopfler", 10.1],
            ["Pink Floyd", 15.9],
            ["Metallica", 20.1],
            ["Michael Bublé", 11.1],
            ["Dire Straits", 12.2],
            ["Mariah Carey", 1.1],
            ["Cat Stevens", 12.9],
            ["Mark Forster", 2.1],
            ["Helene Fischer", 3.1],
            ["Bee Gees", 25.2]
        ];
        // -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 2 EINTRAGEN
        // Lösung a) ...
        console.log(`Länge ist ${events.length}.`);
        // Lösung b) ...
        for (let outerIndex = 0; outerIndex < events.length; outerIndex++) {
            console.log(`${events[outerIndex]}`);
        }
        // Lösung c) ...
        console.log(getHighestPrice(events));
        function getHighestPrice(_events) {
            let max = _events[0][1];
            for (let outerIndex = 0; outerIndex < events.length; outerIndex++) {
                if (_events[outerIndex][1] > max) {
                    max = _events[outerIndex][1];
                }
            }
            return max;
        }
        // Lösung d) ...
        console.log(isArtistExistent(events, "Cat Stevens"));
        function isArtistExistent(_events, _artistNmae) {
            for (let outerIndex = 0; outerIndex < events.length; outerIndex++) {
                if (_events[outerIndex][0] == _artistNmae) {
                    return true;
                }
            }
            return false;
        }
        // Lösung e) ...
        factorial(4);
        function factorial(n) {
            let i = 1;
            let ergebnis = 1;
            while (i <= n) {
                ergebnis = ergebnis * i;
                i = i + 1;
            }
            console.log(ergebnis);
        }
        // Lösung f) ...
        let amount = 0;
        for (let i = 1; i <= 100; i++) {
            if (i % 3 == 0) {
                console.log(i);
                amount++;
            }
        }
        console.log(amount);
        // Lösung g) ...
        class ConcertEvent {
            interpret;
            price;
            constructor(interpret, price) {
                this.interpret = interpret;
                this.price = price;
            }
            show() {
                console.log(this.interpret, this.price);
            }
        }
        let c = new ConcertEvent("Nirvana", 20);
        c.show();
        // Lösung h) ...
        let concertEvents = [];
        for (let outerIndex = 0; outerIndex < events.length; outerIndex++) {
            concertEvents.push(new ConcertEvent(events[outerIndex][0], events[outerIndex][1]));
        }
        concertEvents.forEach(concertEvent => concertEvent.show());
    }
})(Scriptvorlage || (Scriptvorlage = {}));
//# sourceMappingURL=scriptvorlage.js.map