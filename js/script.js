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

    // Ogni volta che parte il gioco, pulisce la griglia
    mainGrid.innerHTML = "";

    // Prendo il valore della difficoltà del livello che ci tornano utili per stabilire quanti squares ci sono per ogni livello
    let difficulty = document.getElementById('difficulty').value;
    

    // Numero dei quadrati che cambia a seconda della difficoltà
    let numberOfSquares;

    // In base alla difficoltà modifico il numero dei quadrati che ho dichiarato prima
    if(difficulty === 'easy'){
        numberOfSquares = 100;
    }else if(difficulty === 'hard'){
        numberOfSquares = 81;
    }else if(difficulty === 'crazy'){
        numberOfSquares = 49;
    }


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
            this.classList.add('active');
        })

        // If per modificare la grandezza dei quadrati (che occupano l'intera griglia) a seconda del numero dei quadrati presenti
        if(numberOfSquares === 100){
            newSquare.classList.add('easy');
        }else if(numberOfSquares === 81){
            newSquare.classList.add('hard');
        }else if(numberOfSquares === 49){
            newSquare.classList.add('crazy');
        }
    }
}


