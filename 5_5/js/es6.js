/* 5. Preloader obrazów z użyciem Promise
W lekcjach czwartego tygodnia, w sekcji Ajax w Praktyce oraz model Pub/Sub znajduje się
lekcja pt. Praktyczny przykład: Preloader obrazów. Utwórz podobne rozwiązanie, ale nie
korzystając z jQuery, a z natywnych metod DOM API. Zamiast obiektu Deferred z jQuery,
wykorzystaj Promise dostępną w ES6. Załadowane w tle obrazy zamień następnie na
elementy <img> i wstaw na stronę. Przykładowe użycie tego kodu powinno wyglądać
następująco: https://pastebin.com/jM7N6NTn
*/



(function(){

    function preloadImages(urls) {

        let length = urls.length,
            counter = 0,
            good_urls = [];

        let promise = new Promise(function(resolve, reject) {

            urls.forEach(function(url, i) {

                let img = document.createElement("img");

                img.addEventListener("load", function() {

                    counter++;
                    good_urls.push(url);

                    //dfd.notify(url, counter, length);

                    if(counter === length) {
                        resolve(good_urls);
                    }

                }, false);

                img.addEventListener("error", function() {

                    length--;

                    //dfd.notify(null, counter, length);

                    if(counter === length) {
                        if(good_urls.length !== 0){
                            resolve(good_urls);
                        } else {
                            reject(new Error("Brak obrazów do wyświetlenia."));
                        }
                    }

                }, false);

                img.setAttribute("src", url);

            });

        });

        return promise;

    }



    function createImage(url) {

        let img = document.createElement("img");
        img.setAttribute("src", url);
        img.classList.add("img");            
        
        return img;

    }



//// UŻYCIE

const urls = [
    "http://code.eduweb.pl/kurs-jquery/images/photo-1.jpg",
    "http://code.eduweb.pl/kurs-jquery/images/photo-2.jpg",
    "ttp://code.eduweb.pl/kurs-jquery/images/photo-3.jpg",
    "http://code.eduweb.pl/kurs-jquery/images/photo-4.jpg"
];

preloadImages(urls)
    .then((imgs) => {
        console.log("Obrazy wczytane.");

        // tutaj utwórz dla każdego adresu URL
        // z przekazanej tablicy imgs element <img>
        // i wstaw je wszystkie do fragmentu dokumentu,
        // który na końcu zwrócisz, aby był dostępny
        // w kolejnym bloku .then

            let docFragm = document.createDocumentFragment();
            imgs.forEach(function(img, i){
                docFragm.appendChild(createImage(img));
            });
            return docFragm;
    })

    // wstaw otrzymany fragment dokumentu na stronę,
    // aby wczytane obrazy się pokazały    
    .then(
        (docFragment) => document.querySelector(".rte").appendChild(docFragment)
    )

    // na wypadek błędu, wyświetl komunikat w konsoli
    .catch(
        err => console.log(err.message)
    );


})();
