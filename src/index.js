const MORSE_TABLE = {
    '.-':     'a',
    '-...':   'b',
    '-.-.':   'c',
    '-..':    'd',
    '.':      'e',
    '..-.':   'f',
    '--.':    'g',
    '....':   'h',
    '..':     'i',
    '.---':   'j',
    '-.-':    'k',
    '.-..':   'l',
    '--':     'm',
    '-.':     'n',
    '---':    'o',
    '.--.':   'p',
    '--.-':   'q',
    '.-.':    'r',
    '...':    's',
    '-':      't',
    '..-':    'u',
    '...-':   'v',
    '.--':    'w',
    '-..-':   'x',
    '-.--':   'y',
    '--..':   'z',
    '.----':  '1',
    '..---':  '2',
    '...--':  '3',
    '....-':  '4',
    '.....':  '5',
    '-....':  '6',
    '--...':  '7',
    '---..':  '8',
    '----.':  '9',
    '-----':  '0',
};

function decode(expr) {
    
    expr = Array.from(expr);

    let arrayOfSubarrays = [];
    
    for (i = 0; i < expr.length; i += 10) {
      let array10 = expr.slice(i, i + 10); 
      arrayOfSubarrays.push(array10);
    }
    
    //arrayOfSubarrays; // массив с подмассивами строк по 10 символов
    let numbers =  arrayOfSubarrays.map( subArray10 => +subArray10.join('').split() );
    // 10101010 & NaN
    
    //let subArrayItems = numbers.map( number => String(number).split() );
  
      let letters = numbers.map( number => {   
        if (Object.is(number, NaN) === true) {
          return ' ';
        
        } else {
          return number.toString().split('');
        }
      });
        
    let arrayLetters = letters.map ( letter => {     
      if (letter === ' ') {
        return ' ';
      } else {
        let arrayOfSubarrays2 = [];
        for (i = 0; i < letter.length; i += 2) {
          let array2 = +letter.slice(i, i + 2).join(''); 
          arrayOfSubarrays2.push(array2);
        }
        return arrayOfSubarrays2;
      }
    });  // на выходе массив таких массивов [10,10,10,10], [11,11,11] и т.д.

  
  let arrayMorse = arrayLetters.map( symbol => { 
    if (symbol === ' ') {
        return ' ';
      } else {
        let morseLetter = '';
        for (i = 0; i < symbol.length; i ++) {
          if (symbol[i] === 10) {morseLetter += '.'};
          if (symbol[i] === 11) {morseLetter += '-'};
        }
        return morseLetter;
      }
  }); //["....",".",".-..",".-..","---"," ",".--","---",".-.",".-..","-.."]
    
  //Object.keys(MORSE_TABLE)
  let arrayDecoded = arrayMorse.map( morse => {
    let phrase = '';
    if (morse === ' ') {
        phrase += ' ';
      } else {
        phrase += MORSE_TABLE[morse];
      }  
    return phrase; 
  }); //  ["h","e","l","l","o"," ","w","o","r","l","d"]  
    
    return arrayDecoded.join('');
}

module.exports = {
    decode
}