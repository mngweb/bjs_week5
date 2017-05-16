/* 4. Iterator dla klasy losującej liczby
W lekcjach drugiego tygodnia, w sekcji Praktyczne projekty znajduje się lekcja
pt. Losowanie Dużego Lotka. Utwórz z użyciem zapisu ES6 klasę Lotek, która zawierać
będzie metodę getNumbers, a ta z kolei wylosuje liczby według logiki ze wspomnianej
lekcji. Metoda ta powinna być wywoływana od razu przy tworzeniu nowej instancji obiektu
tej klasy. Wylosowane liczby musisz zatem zapisać wewnątrz obiektu. Dodatkowo stwórz
metodę checkNumbers, która pozwoli podać 6 liczb jako osobne argumenty i zwróci obiekt,
który zawierał będzie właściwości numbers, gdzie będzie tablica z trafionymi liczbami oraz
count, gdzie będzie liczba trafionych numerów.
To jednak dopiero początek, gdyż najważniejszym celem tego zadania jest dodanie
iteratora do tej klasy. Po poprawnym jego dodaniu, kiedy na obiekcie utworzonym z tej
klasy użyjemy operatora …spread lub pętli for…of, powinien on zwrócić kolejne wylosowane liczby. Przykładowe użycie tego kodu powinno wyglądać następująco:
https://pastebin.com/0zygc3hk.
*/


(function(){


    class Lotek{

        constructor(){
            this.numbers = this.getNumbers();
        }

        getNumbers(){
            var numbers = [],
                random;

            for(var i = 0; i < 6; i++) {
                random = this.getRandom(1, 49);

                while(numbers.indexOf(random) !== -1) {
                    random = this.getRandom(1, 49);
                    console.log("Powtórzyła się liczba " + random);
                }

                numbers.push(random);

            }

            return numbers;

        }

        getRandom(min, max) {	
            return Math.round(Math.random() * (max - min) + min);		

        }

        checkNumbers(...args){
            let goodShots = [];

            args.forEach((checkNr, i) => {
                this.numbers.forEach(function(lottoNr, i){
                    if(checkNr === lottoNr){
                        goodShots.push(checkNr);
                    }
                })
            })

            return {
                numbers: goodShots,
                count: goodShots.length
            };
        }

        [Symbol.iterator]() {
            var numbers = this.numbers,
                index = 0;

            return {
                next: function() {
                    return {
                        done: (index === numbers.length) ? true : false,
                        value: numbers[index++]
                    };
                }
            };
        }

    }



    ////// UŻYCIE
    let output = document.querySelector("#showNumbers");

    let shot = new Lotek();

    let results = shot.checkNumbers(2, 13, 15, 22, 34, 40);
    // zwraca np. { numbers: [13, 22], count: 2 }

    goodShots.value = `You have ${results.count} good ${(results.count === 1) ? "shot" : "shots"}${results.count === 0 ? "" : ": " + results.numbers.toString()}.`;

    // tablica ze wszystkimi wylosowanymi liczbami
    let numbers = [...shot];

    // wyświetla kolejno wylosowane liczby
    for(let number of shot) {
        console.log(number);
    }
    output.value = numbers.join(", ");


})();
