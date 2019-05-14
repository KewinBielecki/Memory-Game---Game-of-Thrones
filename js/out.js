const cardColors = [
    "tyrion", "tyrion",
    "jonsnow", "jonsnow",
    "daenerys", "daenerys",
    "arya", "arya",
    "sansa", "sansa",
    "davos", "davos",
    "jaime", "jaime",
    "ogar", "ogar",
    "ned", "ned",
    "tormund", "tormund",
    "beric", "beric",
    "cersei", "cersei",
    "themountain", "themountain",
    "nightking", "nightking",
    "melisandre", "melisandre",
    "varys", "varys",
    "robertbaratheon", "robertbaratheon",
    "jorah", "jorah"];

//pobranie głównego diva

let mainDiv1 = document.querySelector('.backgroundDiv');

console.log(mainDiv1);


// pobranie pojedyńczych małych divów

let cards = mainDiv1.querySelectorAll('div');

console.log(cards);


// zmienna z aktualnie klikniętą kartą

let activeCard = '';


// tablica dwóch aktualnych kart

let activeCards = [];


// zmienna pokazująca ile kart zostało do końca gry

let gameLength = cards.length / 2;


// zmienna z wynikiem

let gameResult = 0;

// zmienna z aktualnym czasem

const startTime = new Date().getTime();


// pobieranie spana do wyświelenia czasu

let time = document.querySelector('.time');


let counter = 0;

function getYourTime() {

    time.innerText='Czas: ' + counter;

    let yourTime = setInterval(() => {time.innerText='Czas: ' + ++counter},1000);

}

getYourTime();







// funkcja mieszająca kolory w tablicy cardColors

function shuffle(cardColors) {

    for (let i = cardColors.length - 1; i > 0; i--) { // pętla leci od ostatniego indexu po całej tablicy i co przejście odejmuje jeden index

        const j = Math.floor(Math.random() * (i + 1)); // zmienna pomocnicza losująca z przedziału 0 do i + 1

        [cardColors[i], cardColors[j]] = [cardColors[j], cardColors[i]]; // zamiana miejscami elementów o indexach 'i', 'j'
    }

    return cardColors;
}

shuffle(cardColors);

console.log(cardColors);

// funkcja nadająca klasy dla cards, na podstawie elementów z tablicy cardColors

function addClass() {

    for (let i = cardColors.length - 1; i >= 0; i--) {

            cards[i].classList.add(cardColors[i]);
    }
}

addClass();


// funkcja dodająca po 5 sekundach klasę hidden, oraz event clickCard

setTimeout(function () {

    for (let i = cards.length - 1; i >= 0; i--) {

        cards[i].classList.add('hidden');

        cards[i].addEventListener('click', clickCard)

    }
}, 5000);





// event kliknięcia w kartę

const clickCard = function () {

    activeCard = this; // przypisanie do zmiennej stałego thisa dla klikniętej karty

    console.log(event.target); // sprawdzenie która karta została kliknięta


    if (activeCard === activeCards[0]) return activeCard; // jeśli kliknięta karta jest taka sama jak activeCards[0] to zwróć ją. Zabezpiecznie, żeby nie kliknąć 2 razy tej samej karty

    if (activeCards.length === 2) return activeCard; // jeśli długość tablicy wynosi 2, to zwróć aktywną kartę. Zabezpieczenie, żeby nie kliknąć więcej niż 2 kart

    console.log(activeCard);


    activeCard.classList.remove('hidden'); // usunięcie z klikniętej karty klasy hidden



    if (activeCards.length === 0) { // jeśli tablica ma długość 0 to...

        console.log("wybrana 1 karta");

        activeCards[0] = activeCard; // przypisanie w tablicy activeCards do pozycji numer 1 wybranej karty

    } else {

        console.log("wybrana 2 karta");

        activeCards[1] = activeCard; // przypisanie w tablicy activeCards do pozycji numer 2 wybranej karty
    }



    setTimeout(function () { // 2s timeout który po odsłonięciu kart sprawdza...


        if (activeCards.length !== 2) return; // jeżeli długość tablicy nie równa się 2 to wyjdz z funkcji


    if (activeCards[0].className === activeCards[1].className) { // jeśli klasy w elementach z indexow są takie same to...

        console.log('super');

        activeCards[0].classList.add('off'); // dodanie klasy off

        activeCards[1].classList.add('off'); // dodanie klasy off

        activeCard = 0; // zerowanie zmiennej aktualnej karty

        activeCards.forEach(card => card.removeEventListener('click', clickCard)); // usunięcie eventu z wyłączonych kart

        activeCards = []; // zerowanie tablicy z wybranymi kartami

        gameResult++; // zwiększenie aktualnego wyniku



        //Sprawdzenie czy nastąpił koniec gry
        if (gameResult == gameLength) { // jeśli są takie same to...

            const endTime = new Date().getTime(); // zmienna która będzie pobierała aktualny czas w momencie sprawdzania czy karty się zgadzają i czy jest koniec gry

            const gameTime = (endTime - startTime) / 1000; // zmienna licząca czas gry. Odejmuje końcowy czas od początkowego i dzieli na 1000, żeby nie wyświetlalo w milisekundach

            function show_alert() {
                alert(`Udało się! Przeszedłeś grę w czasie ${counter} sekund`);
                location.reload();
            }
            show_alert()

            // alert(`Udało się! Przeszedłeś grę w czasie ${counter} sekund`); // wyświetl...
            //
            // location.reload(); // odśwież by zagrać ponownie

        }
    }

    else {

        console.log("przegrana");

        activeCards.forEach(card => card.classList.add("hidden"));

        activeCard = 0; // zerowanie zmiennej aktualnej karty

        activeCards = []; // zerowanie tablicy z wybranymi kartami

        // cards.forEach(card => card.addEventListener("click", clickCard))
        }
    },2000)
};