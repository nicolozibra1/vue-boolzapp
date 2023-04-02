// NUMERO CASUALE DA 1 A 9
function getRndNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// LETTERA CASUALE DA A ad F
function getRndLetter() {
    const min = 65;
    const max = 70;
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return String.fromCharCode(randomNum);
  }
  