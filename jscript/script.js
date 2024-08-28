/* FUNZIONI */
// Funzione che genera tot numeri casuali da min a max compresi
const getRandNumbers = (min, max, totalNumbers) => {
  const computedNums = [];

  for (let i = 0; computedNums.length < totalNumbers; i++) {
    const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!computedNums.includes(randNum)) computedNums.push(randNum);
  }
  
  return computedNums;
}

/**
 * Funzione per creare colonne della card contenenti un numero
 * @param {array} num
 * @param {num} totalCards
 * @returns {string} Contiene l'HTML per creare quanto descritto nella descrizione della funzione
 */
const createCardColumns = (nums, totalCards) => {
  let cardCols = '';

  for (let i = 0; i < totalCards; i++) {
    const cardDiv = `<div class="card">${nums[i]}</div>`;
    const colDiv = `<div class="col">${cardDiv}</div>`;
    cardCols += colDiv;
  }
  
  return cardCols;
}

// Funzione per creare colonne dell'input
const createInputColumns = totalInputs => {
  let inputCols = '';

  for (let i = 0; i < totalInputs; i++) {
    const inputDiv = `<input type="number" name="number" min="0" id="">`;
    const colDiv = `<div class="col">${inputDiv}</div>`;
    inputCols += colDiv;
  }
  
  return inputCols;
}
/*  */


// FASE DI PREPARAZIONE
const playButton = document.getElementById('play-btn');
const numbersBox = document.querySelector('.numbers-box');
const form = document.querySelector('form');
const messageBoxPar = document.querySelector('.message-box p');
const userNumbers = [];
const correctUserNumbers = [];
let hasGameRestarted = false;
// Inizializzo un contatore per il tempo a disposizione ed un timer
let remainingTime = 5;
let timer;
// Calcolo 5 numeri casuali
let cpuNumbers;


// FASE DI ELABORAZIONE
playButton.addEventListener('click', () => {
  // Imposto la variabile di gioco riavviato a true se ho già un timer
  if (timer) hasGameRestarted = true;
  // Ripristino impostazioni iniziali per giocare una nuova partita
  if (hasGameRestarted) {
    // Fermo e resetto il timer
    clearInterval(timer);
    remainingTime = 5;
    console.log(remainingTime);
    // Riscrivo il messaggio di gioco iniziato
    messageBoxPar.innerHTML = 'Memorizza i seguenti numeri entro <span class="game-time"></span> secondi.';
    // Recupero nuovamente il punto con il countdown
    // Rimostro il box dei numeri
    numbersBox.classList.remove('d-none');
    // Tolgo di nuovo il form
    form.classList.add('d-none');
  }
  // 1. Genero 5 numeri casuali e mostro in pagina il contatore già inizializzato
  cpuNumbers = getRandNumbers(0, 100, 5);
  console.log(cpuNumbers);
  messageBoxPar.classList.remove('d-none');
  // recupero la lo span game-time
  const gameTime = document.querySelector('.game-time');
  // stampo in game-time
  gameTime.innerText = remainingTime;
  
  // 2. Inserisco in pagina i 5 numeri creati per mezzo dell'apposita funzione
  console.log(createCardColumns(cpuNumbers, cpuNumbers.length))
  numbersBox.querySelector('.row').innerHTML = createCardColumns (cpuNumbers, cpuNumbers.length);
  
  // 3. Faccio partire un timer di 30 secondi sfruttando la variabile
  // già creata per il tempo rimanente
  timer = setInterval(() => {
    // decremento la variabile timer e la stampo in pagina
    gameTime.innerText = --remainingTime;
    // verifico se il tempo è finito e...
    if (!remainingTime) {
      // 4. Stoppo il timer
      clearInterval(timer);
      // 5. Rimuovo i 5 numeri dalla pagina
      numbersBox.classList.add('d-none');
      // 6. Chiedo all'utente di inserire i numeri negli inputs dopo averli generati
      // 6.1 Genero gli inputs e il bottone
      form.querySelector('.row').innerHTML = createInputColumns (cpuNumbers.length);
      const checkButton = `<button id="check-btn" class="btn btn-primary">Verifica</button>`;
      if (!form.querySelector('#check-btn')) form.innerHTML += checkButton;
      // 6.2 Mostro il form
      form.classList.remove('d-none');
      // 6.3 Richiesta all'utente
      messageBoxPar.innerText = 'Inserisci i numeri precedenti in qualsiasi ordine.';
    }
  }, 1000)

  // 7. Cambio il testo di play-btn
  if (playButton.innerText == 'Play now') playButton.innerText = 'Play again';
})

// 8. Recupero i numeri inseriti dall'utente nel form al click sul bottone
form.addEventListener('submit', e => {
  // impedisco il ricaricamento della pagina
  e.preventDefault();
  
  // con un ciclo for inserisco i numeri nella variabile userNumbers
  // ripulisco prima userNumbers
  userNumbers.splice(0, userNumbers.length);
  for (let i = 1; userNumbers.length < 5; i++) {
    const userNumber = document.querySelector(`.col:nth-child(${i}) input`).value;
    // VALIDAZIONE
    if (isNaN(parseInt(userNumber)) || userNumbers.includes(userNumber)) {
      alert('Hai inserito un valore non consentito, inserisci solo numeri e tutti diversi');
      return;
    }
    userNumbers.push(userNumber);
  }
  
  //mostro in console i numeri recuperati
  console.log(userNumbers);
  
  // 9. Controllo con un ciclo sui 5 numeri
  // ripulisco prima correctUserNumbers
  correctUserNumbers.splice(0, correctUserNumbers.length);
  for (let i = 0; i < userNumbers.length; i++) {
    // 10. se uno sia uguale ad uno dei numeri precedenti mostrati
    controlledUserNumber = parseInt(userNumbers[i]);
    if (cpuNumbers.includes(controlledUserNumber)) correctUserNumbers.push(controlledUserNumber);
  }


  // FASE DI PRESENTAZIONE DATI
  // 11. Rimuovo il form e mostro l'esito del controllo in pagina
  form.classList.add('d-none');
  // scrivo il risultato che viene stampato in pagina in una variabile
  let finalResult = `Hai ricordato `
  if (correctUserNumbers.length == 1) {
    finalResult += `un numero corretto ed è ${correctUserNumbers.join(', ')}`;
  } else if (correctUserNumbers.length) {
    finalResult += `${correctUserNumbers.length} numeri corretti e sono ${correctUserNumbers.join(', ')}`;
  } else if (!correctUserNumbers.length) {
    finalResult =`Non hai ricordato nessun numero`;
  }
  // stampo in pagina
  messageBoxPar.innerText = finalResult + '.';
})

