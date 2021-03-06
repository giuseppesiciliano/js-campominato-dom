// Al click sul bottone play, parte il gioco (funzione)
const playButton = document.getElementById('play');
playButton.addEventListener('click', startGame);
// OPPURE document.getElementById('play').addEventListener('click', startGame);


// Funzione che fa partire il gioco
function startGame() {

    // Seleziono l'h2 e aggiungo la classe 'hidden'
    const introText = document.getElementById('intro-text');
    introText.classList.add('hidden');

    // Seleziono la griglia del gioco e rimuovo la classe 'hidden'
    const mainGrid = document.getElementById('grid');
    mainGrid.classList.remove('hidden');

    // Ogni volta che parte il gioco, pulisce la griglia e il messaggio
    mainGrid.innerHTML = "";
    document.getElementById('message').innerHTML = '';

    // Prendo il valore della difficoltÃ  del livello che ci tornano utili per stabilire quanti squares ci sono per ogni livello
    let difficulty = document.getElementById('difficulty').value;
    

    // Numero dei quadrati che cambia a seconda della difficoltÃ 
    let numberOfSquares;

    // In base alla difficoltÃ  modifico il numero dei quadrati che ho dichiarato prima
    if(difficulty === 'easy'){
        numberOfSquares = 100;
    }else if(difficulty === 'hard'){
        numberOfSquares = 81;
    }else if(difficulty === 'crazy'){
        numberOfSquares = 49;
    }





    // Generare le bombe
    const bombsAmount = 16;
    const bombsArray = generateBombs(numberOfSquares, bombsAmount);

    // Calcolare il numero massimo dei tentativi per determinare la vincita della partita
    const maxAttempts = numberOfSquares - bombsArray.length;

    // Creare un'array col numero dei quadrati non-bombe
    const rightAttemptsArray = []



    // Per ogni numero inserisco uno square col numero ordinale
    for(let i = 1; i <= numberOfSquares; i++) {

        // Creo una costante inserendo un div, aggiungendo una classe e all'interno di quest'ultima uno span col numero del ciclo
        const newSquare = document.createElement('div');
        newSquare.classList.add('square');
        newSquare.innerHTML = `<span>${i}</span>`;

        // Alla fine appendo tutto alla griglia del gioco
        document.getElementById('grid').appendChild(newSquare);   

        // Quando clicco su newSquare (al div che rappresenta il quadrato) aggiungo la classe 'active'
        newSquare.addEventListener('click', function() {
            
            const clickedNumber = parseInt(this.querySelector('span').textContent);
            if(bombsArray.includes(clickedNumber)) {
                this.classList.add('bomb');
                endGame('lose');
            } else{
                this.classList.add('active');
                this.style.pointerEvents = "none";
                rightAttemptsArray.push(clickedNumber);

                if(rightAttemptsArray.length >= maxAttempts) {
                    endGame('win');
                }
            }
        })

        // If per modificare la grandezza dei quadrati (che occupano l'intera griglia) a seconda del numero dei quadrati presenti
        if (numberOfSquares === 100){
            newSquare.classList.add('easy');
        } else if(numberOfSquares === 81){
            newSquare.classList.add('hard');
        } else if(numberOfSquares === 49){
            newSquare.classList.add('crazy');
        }
    }

    // Funzione che stampa il messaggio di vincita o di perdita dell'utente
    function endGame(winOrLose) {
        let message;
        if(winOrLose === 'win') {
            message = 'HAI VINTO!'
        } else {
            message = 'Hai perso! Hai fatto ' + rightAttemptsArray.length + ' tentativi.';

            // Rendo tutti i quadrati non piÃ¹ cliccabili
            const allClickedNumbers = document.getElementsByClassName('square');
            for (let i = 0; i < allClickedNumbers.length; i++) {
                const thisClickedNumbers = allClickedNumbers[i];
                thisClickedNumbers.style.pointerEvents = "none";
            }
        }

        // Stampo il messaggio con l'esito del gioco nel DOM
        document.getElementById('message').innerHTML = message;
        document.getElementById('message').classList.remove('hidden');
    }
}


// --------
// FUNCTIONS
// --------

// Funzione ritorna un numero (16) di bombe compreso tra 1 e numberOfSquares, random
function generateBombs(maxRangeNumber, numberOfBombs) {
    
    // Dichiaro l'array che conterrÃ  il numero di bombe (16)
    const arrayOfBombs = [];

    // FinchÃ¨ l'array che contiene le bombe non Ã¨ lungo quanto il numero di bombe, aggiunge numeri random all'array
    while (arrayOfBombs.length < numberOfBombs) {
        const randomNumber = getRndInteger(1, maxRangeNumber);

        // Se il numero random generato non Ã¨ incluso nell'array, viene pushato
        if (!arrayOfBombs.includes(randomNumber)) {
            arrayOfBombs.push(randomNumber);
        }
    }

    // Ritorna il numero di bombe con numero random
    return arrayOfBombs;
}


// Funziona che ritorna un numero random
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}




// --------
// INDICE
// --------

// bombsAmount = numero complessivo di bombe presenti nel gioco
// bombsArray = array contenente il numero di bombe con numeri random
// difficulty = variabile col .value del livello scelto dall'utente
// game-grid = classe della griglia di gioco
// grid = id della griglia di gioco
// newSquares = costante che contiene il div con all'interno lo span col numero ordinale
// numberOfSquare = numero dei quadrati (in base al livello di difficoltÃ )
// playButton = costante che seleziona il pulsante play
