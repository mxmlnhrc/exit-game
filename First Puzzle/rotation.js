function rotateString(rotIn, shift) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const alphabetLength = alphabet.length;

    return rotIn.split('').map(char => {
        if (alphabet.includes(char)) {
            const currentIndex = alphabet.indexOf(char);
            const newIndex = (currentIndex + shift) % alphabetLength;
            return alphabet[newIndex < 0 ? newIndex + alphabetLength : newIndex];
        }
        return char;
    }).join('');
}

//const rotIn = "kdoor";
//const shift = -3; // Um eine ein "Pre-State" zu erstellen einfach aus dem Minus ein Plus machen und in console ansehen
//console.log(rotateString(rotIn, shift)); // Ausgabe: "hallo"