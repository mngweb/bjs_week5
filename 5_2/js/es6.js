/* 2. Funkcja tagująca do formatowania cen
Utwórz funkcję tagującą, która użyta na tzw. template stringu w ES6, sformatuje podane w
nim ceny za pomocą kodu: n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
(pożyczamy ciekawe rozwiązanie z tego postu). Zanim jednak dokonasz takiego
formatowania, przelicz cenę przez kurs podanej przy wywołaniu funkcji tagującej waluty.
Zakładamy, że ceny bazowe są podane w złotówkach, a nazwa i kurs waluty dostępna
będzie pod window.currencies (mogłaby być w ten sposób dodana np. podczas
renderowania strony przez system CMS, a dzięki temu mamy dostęp do tych danych wkodzie JavaScript. My jednak wpiszemy to sobie na sztywno). Przykładowe użycie tego
kodu powinno wyglądać następująco: https://pastebin.com/6A3WZF6h. Zauważ, że przed
samym template stringiem nie jest podana wyłącznie nazwa funkcji formatPrice, ale jest
ona wywoływana z argumentem “GBP”. Jak być może się domyślasz, oznacza to, że ta
funkcja ma zwrócić inną funkcję, która zostanie użyta jako tag function. Argument jest
przekazywany po to, aby można go było zmienić np. na “USD” i wówczas funkcja powinna
przeliczyć cenę po kursie dolara, a także dodać przyrostki USD do ceny w sformatowanym
ciągu. Zwracana funkcja, która posłuży jako funkcja tagująca, powinna mieć zatem dostęp
do zmiennej przechowującej kurs oraz nazwę waluty dla podanego argumentu.
Zrealizujesz to za pomocą domknięcia.
*/


(function(){

    function formatPrice(currencyName){

        let currencyRate = window.currencies[currencyName];

        return function(strings, ...values){

            let output = "";

            strings.forEach(function(string, index){
                let val = values[index];

                output += string;

                if(val !== undefined){
                    if(typeof val === "number"){
                        val /= currencyRate;
                        val = val.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
                        output += `${val} ${currencyName}`;
                    } else {
                        output += val;
                    }
                    
                }
            })

            return output;
        }

    }


    window.formatPrice = formatPrice;

})();