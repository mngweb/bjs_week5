/* 1. Dekompozycja obiektu z danych JSON
Pamiętasz funkcję getJSON, którą stworzyłeś w tygodniu trzecim? Za jej pomocą pobierz
dane JSON z tego adresu: http://code.eduweb.pl/bootcamp/json/. Następnie w funkcji
callback, gdzie te dane będą już zamienione na obiekt JavaScript, wykorzystaj
dekompozycję (destructuring), aby utworzyć za pomocą zapisu ES6 nowe zmienne, które
przechowywać będą dane spod kluczy: name, username, email, address.geo[0],
address.geo[1], website i company.name. Powyższe dane wstaw do template stringu,
dodając odpowiednie etykiety jak np. Imię, Firma czy Adres e-mail wraz z niezbędnym
kodem HTML, np. w formie linku dla website. W przypadku współrzędnych
geograficznych, wstaw je do takiego linku: <a href=“http://bing.com/maps/
default.aspx?cp=LAT~LON”>Pokaż na mapie</a>, gdzie LAT i LON zastąpisz kolejno
przez address.geo[0] i address.geo[1], które na tym etapie powinny być już w
zmiennych. Powyższą operację wykonaj oczywiście dla wszystkich obiektów z tablicy.
Cały sformatowany ciąg wraz ze wstawkami HTML wstaw na stronę. Sam proces
pobierania danych Ajaxem i dalszego ich formatowania, możesz wywołać za pomocą
kliknięcia jakiegoś przycisku.
*/


(function() {


function getJSON(url, success, fail) { 
        
        if(arguments.length !== 3 
            || typeof url !== "string"  || url instanceof String
            || typeof success !== "function"
            || typeof fail !== "function" ){

            throw new Error("Podaj prawidłowe parametry");
        } 
        

        var xhr = new XMLHttpRequest();

        xhr.open("GET", url, true);

        xhr.setRequestHeader('Accept', 'application/json')

        xhr.onload = function(e) {

            var res = JSON.parse(xhr.responseText);

            if (this.status === 200) {
                success(res);
            } else {
                fail( new Error("Błąd - status HTTP: " + xhr.status) );
            }
        };        

        xhr.onerror = function(e) {
            fail( new Error("Błąd: " + e.type) );
        }

        xhr.send();


    }


    const API_URL = "http://code.eduweb.pl/bootcamp/json/";

    document.querySelector("#btn").addEventListener("click", function(e) {

        var result = document.querySelector("#response");
        result.innerHTML = "";

        getJSON(API_URL, function(data) {
            console.log("Sukces");

            data.forEach(function(person) {
                
                let {
                    id,
                    name: personName, 
                    username: username, 
                    email: email, 
                    address: {
                        geo: [lat, lon]
                    }, 
                    website: website, 
                    company: {
                        name: companyName
                    }
                } = person || {};


                let template = `
<h2>${personName}</h2> 
<div>
    <img src="http://lorempixel.com/100/100/people/${id}"/>
    <p>
        Nazwa użytkownika: ${username} 
        Email: <a href="mailto:${email}">Wyślij email</a>
        Lokalizacja: <a href="http://bing.com/maps/default.aspx?cp=${lat}~${lon}">Pokaż na mapie</a>
        WWW: <a href="http://${website}">Przejdź do strony</a>
        Firma: ${companyName}
    </p>
</div>
`;

                var personInfo = document.createElement("article");
                personInfo.innerHTML = template;
                personInfo.classList = "personInfo";
                result.appendChild(personInfo);

            });



        }, function(err) {
            console.log("Wystąpił błąd!");
            console.log(err.message);
        });

    }, false);


})();